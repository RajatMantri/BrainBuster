const express = require('express');
const router = express.Router();
const Team = require('../../models/Team.js');

router.delete('/teams/:teamId', async (req, res) => {
    const { teamId } = req.params;
    try {
      await Team.findByIdAndDelete(teamId);
      res.json({ message: 'Team deleted successfully' });
    } catch (error) {
      console.error('Error deleting team:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

module.exports = router;