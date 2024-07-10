const express = require('express');
const router = express.Router();
const Response = require('../../models/Response.js');

router.get('/leaderboard/:quizId', async (req, res) => {
    try {
      const {quizId}  = req.params;
      

      const responses = await Response.find({ quizId, attempt: 0 }).sort({  score: -1, timeTaken: 1 });
      // console.log(responses);
      // console.log(quizId);
  
      if (!responses || responses.length === 0) {
        return res.status(404).json({ error: 'No responses found' });
      }
      
      res.status(200).json(responses);
  
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
      res.status(500).json({ error: 'Failed to fetch leaderboard data' });
    }
  });

  module.exports = router;