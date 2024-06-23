const express = require('express');
const router = express.Router();
const Quiz = require('../../models/Quiz.js');

app=express;

router.post('/submitQuiz', async (req, res) => {
    try {
     const username = req.body.username.username;
     const questions = req.body.questions;
     const title = req.body.title;
  
      // console.log(req.body);
      const newQuiz = new Quiz({ username, title, questions });
      await newQuiz.save();
      res.status(201).json({ message: 'Quiz submitted successfully'});
    } catch (error) {
      res.status(500).json({ message: 'Failed to submit quiz', error });
    }
  });
 

  module.exports = router;