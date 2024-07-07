const express = require('express');
const router = express.Router();
const Quiz = require('../../models/Quiz.js');
const Team = require('../../models/Team.js');

app=express;

router.get('/quizzes/show/:username/:teamId', async (req, res) => {
  const { username, teamId } = req.params;
  try {
    // Step 1: Fetch all quizzes associated with the username
    const userQuizzes = await Quiz.find({ username });

    // Step 2: Find the team with the given teamId to get its quizzes
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Step 3: Filter out quizzes that are already associated with the team
    const teamQuizIds = team.quizzes.map(quiz => quiz._id);
    const remainingQuizzes = userQuizzes.filter(quiz => !teamQuizIds.includes(quiz._id.toString()));

    // Step 4: Send the remaining quizzes
    res.json({ quizzes: remainingQuizzes });

  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/quizzes/show/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const quizzes = await Quiz.find({ username: username });
    if (!quizzes || quizzes.length === 0) {
      return res.status(404).json({ message: 'No quizzes found for the specified username' });
    }
    console.log(quizzes.length);
    res.status(200).json(quizzes);

  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

  module.exports = router;