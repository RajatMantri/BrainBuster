const express = require('express');
const router = express.Router();
const Quiz = require('../../models/Quiz.js');

app=express;

router.get('/quizzes/show/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const quizzes = await Quiz.find({ username: username });
    if (!quizzes || quizzes.length === 0) {
      return res.status(404).json({ message: 'No quizzes found for the specified username' });
    }
    res.status(200).json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

  module.exports = router;