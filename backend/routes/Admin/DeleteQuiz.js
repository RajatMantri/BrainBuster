// routes/Admin/DeleteQuiz.js

const express = require('express');
const router = express.Router();
const Quiz = require('../../models/Quiz.js');
const Team = require('../../models/Team.js');

router.delete('/quizzes/:quizId', async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
    if (!deletedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/teams/:teamId/quizzes/:quizId', async (req, res) => {
  const { teamId, quizId } = req.params;
  try {
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Check if the quiz is associated with the team
    if (!team.quizzes.includes(quizId)) {
      return res.status(404).json({ message: 'Quiz not found in the team' });
    }

    // Remove the quiz ID from the team's quizzes array
    team.quizzes = team.quizzes.filter(q => q.toString() !== quizId);
    await team.save();

    res.status(200).json({ message: 'Quiz deleted from team successfully' });
  } catch (error) {
    console.error('Error deleting quiz from team:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
