const express = require('express');
const router = express.Router();
const Quiz = require('../../models/Quiz.js');



router.post('/submitQuiz', async (req, res) => {
    try {
      const newQuiz = new Quiz(req.body);
      await newQuiz.save();
      res.status(201).json({ message: 'Quiz submitted successfully'});
    } catch (error) {
      res.status(500).json({ message: 'Failed to submit quiz', error });
    }
  });
 

  module.exports = router;