const express = require('express');
const router = express.Router();
const Quiz = require('../../models/Quiz.js');

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
  
  module.exports = router;