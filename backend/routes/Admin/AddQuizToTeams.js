const express = require('express');
const router = express.Router();
const Team = require('../../models/Team.js');
const Quiz = require('../../models/Quiz.js');

router.put('/:teamId/quizzes/:quizId', async (req, res) => {
    const { teamId, quizId } = req.params;
    try {
      const team = await Team.findById(teamId);
      if (!team) {
        return res.status(404).json({ message: 'Team not found' });
      }
  
      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
      // Check if the quiz is already added to the team
      if (team.quizzes.includes(quizId)) {
        return res.json({ message: 'Quiz already added to the team' });
      }
      // Add the quiz ID to the team's quizzes array
      team.quizzes.push(quizId);
      await team.save();
  
      res.json({ message: 'Quiz added to team successfully' });
    } catch (error) {
      console.error('Error adding quiz to team:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  module.exports = router;