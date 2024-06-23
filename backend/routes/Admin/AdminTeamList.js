const express = require('express');
const router = express.Router();
const Team = require('../../models/Team.js');

app=express;

router.get('/teams/:username', async (req, res) => {
    const  {username}  = req.params;
  
    try {
      const teams = await Team.find({ Owner: username });
      res.json(teams);
    } catch (error) {
      console.error('Error fetching teams:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  module.exports = router;