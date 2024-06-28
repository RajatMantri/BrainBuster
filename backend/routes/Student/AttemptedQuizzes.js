const express = require('express');
const router = express.Router();
const Response = require('../../models/Response.js');

router.get('/getAttemptedQuizzes/:username', async (req, res) => {
    try {
      const { username } = req.params;
    const attemptedQuizzes = await Response.find({ username, attempt: 0 });

      res.status(200).json(attemptedQuizzes);
    } catch (error) {
      console.error('Error fetching attempted quizzes:', error);
      res.status(500).json({ error: 'Failed to fetch attempted quizzes' });
    }
  });

  router.get('/getAttemptedQuizzes/view/:username', async (req, res) => {
    try {
      const { username } = req.params;

      const attemptedQuizzes = await Response.find({ username});

      res.status(200).json(attemptedQuizzes);
    } catch (error) {
      console.error('Error fetching attempted quizzes:', error);
      res.status(500).json({ error: 'Failed to fetch attempted quizzes' });
    }
  });


module.exports = router;