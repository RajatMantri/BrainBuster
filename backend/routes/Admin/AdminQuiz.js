const express = require('express');
const router = express.Router();
const Quiz = require('../../models/Quiz');
const Team = require('../../models/Team');

app=express;

router.get('/quiz/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const quiz = await Quiz.findById(id);
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
      res.status(200).json(quiz);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.get('/teams/:teamId/quizzes', async (req, res) => {
    const { teamId } = req.params;
    //console.log(teamId);
    try {
      const team = await Team.findById(teamId).populate('quizzes');
      if (!team) {
        return res.json({ message: 'Team not found' });
      }
      res.status(200).json(team.quizzes);
    } catch (error) {
      console.error('Error fetching quizzes for team:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  module.exports = router;