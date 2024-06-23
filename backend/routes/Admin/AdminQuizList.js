const express = require('express');
const router = express.Router();
const Quiz = require('../../models/Quiz.js');

app=express;

router.get('/quizzes/', async (req, res) => {
    const username = req.body.username;
    console.log(req.body);
    try {
      // Find quizzes by username
      const quizzes = await Quiz.find({ 'username': username });
      // console.log(quizzes);
      if (!quizzes) {
        return res.status(404).json({ message: 'No quizzes found for the specified username' });
      }
  
      res.status(200).json(quizzes);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  module.exports = router;