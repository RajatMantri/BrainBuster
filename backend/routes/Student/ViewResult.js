const express = require('express');
const router = express.Router();
const Response = require('../../models/Response.js');

router.get('/getResponse/:quizId/:username', async (req, res) => {
    try {
      const { quizId, username } = req.params;
  
      const response = await Response.findOne({ quizId, username })
      .sort({ attempt: -1 })
  
      if (!response) {
        return res.status(404).json({ error: 'Response not found' });
      }

      res.status(200).json(response);
  
    } catch (error) {
      console.error('Error fetching response:', error);
      res.status(500).json({ error: 'Failed to fetch response' });
    }
  });
  
  
  router.get('/getResponse/:quizId/:username/:attempt', async (req, res) => {
    try {
      const { quizId, username, attempt } = req.params;
  
      const response = await Response.findOne({ quizId, username, attempt });
  
      if (!response) {
        return res.status(404).json({ error: 'Response not found' });
      }
  
      res.status(200).json(response);
  
    } catch (error) {
      console.error('Error fetching response:', error);
      res.status(500).json({ error: 'Failed to fetch response' });
    }
  });

  module.exports = router;