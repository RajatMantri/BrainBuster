const express = require('express');
const router = express.Router();
const Team = require('../../models/Team.js');

app=express;

router.post('/createTeam', async (req, res) => {
    try {
      const code = generateRandomCode(6); // Function to generate a random code
      const team = new Team({teamName: req.body.teamName,Code:code, Students: [], Owner:req.body.username }); // Pass ownerUsername as owner
      await team.save();
      res.status(201).json({ message: 'Team created successfully', team });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create team', error });
    }
  });
  
  function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }

  module.exports = router;