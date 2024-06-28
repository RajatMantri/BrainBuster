const express = require('express');
const router = express.Router();
const Team = require('../../models/Team.js');

router.get('/teams/:teamId/quizzes', async (req, res) => {
    const { teamId } = req.params;
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