

const express = require('express');
const router = express.Router();
const Quiz = require('../../models/Quiz.js');
const Team = require('../../models/Team.js');
const Response = require('../../models/Response.js');

router.delete('/quizzes/:quizId/:username', async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const username = req.params.username;
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
    if (!deletedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
        // Delete responses associated with the quizId
      const deletedResponses = await Response.deleteMany({ quizId: quizId });
      
      await Team.updateMany(
        { 'quizzes._id': quizId },
        { $pull: { quizzes: { _id: quizId } } }
      );
    
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/teams/:teamId/quizzes/:quizId', async (req, res) => {
    const { teamId, quizId } = req.params;

    try {
      // Find the team by its ID
      const team = await Team.findById(teamId);
      if (!team) {
        return res.status(404).json({ message: 'Team not found' });
      }
  
      // Remove the quiz with the specified quizId from the quizzes array
      team.quizzes = team.quizzes.filter(quiz => quiz._id !== quizId);
  
      // Save the updated team
      await team.save();
  
      res.status(200).json({ message: 'Quiz removed from team successfully' });
  } catch (error) {
    console.error('Error deleting quiz from team:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
