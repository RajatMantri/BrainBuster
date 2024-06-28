const express = require('express');
const router = express.Router();
const Team = require('../../models/Team.js');

router.get("/student/:username/quizzes", async (req, res) => {
    const { username } = req.params;
  
    try {
      const teams = await Team.find({ Students: username });
  
      res.status(200).json(teams);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      res.status(500).json({ message: "Failed to fetch quizzes." });
    }
  });

  module.exports = router;