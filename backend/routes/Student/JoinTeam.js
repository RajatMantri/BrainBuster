const express = require('express');
const router = express.Router();
const Team = require('../../models/Team.js');

router.post("/joinTeam/:username", async (req, res) => {
    const { teamName, code } = req.body;
    const { username } = req.params;
  
    try {
 
      const team = await Team.findOne({ teamName: teamName,Code: code });
  
      if (!team) {
        return res.status(404).json({ message: "Team not found." });
      }
  
      // Check if the username already exists in the team
      if (team.Students.includes(username)) {
        return res.status(400).json({ message: "Already joined the team." });
      }
       
    //   console.log("team: "+team);
      team.Students.push(username);
      await team.save();
  
      res.status(200).json({ message: "Successfully joined the team." });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Failed to join the team." });
    }
  });

  module.exports = router;