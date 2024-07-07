const express = require('express');
const router = express.Router();
const Response = require('../../models/Response.js');

router.post('/SaveResponse/:quizId/:username', async (req, res) => {
    try {
      const { quizId, username } = req.params;
      const quizData = req.body.quiz;
      const duration = parseInt(req.body.duration)*60;
      const remaining = parseInt(req.body.time);
      console.log('duration: '+duration+' remaining: '+remaining);
  
      // Function to calculate score
      const calculateScore = (questions) => {
        return questions.reduce((score, question) => {
          if (question.selectedAnswer == question.correctAnswer) {
            return score + 1;
          }
          return score;
        }, 0);
      };
  
      // Calculate the score for the response
      const score = calculateScore(quizData.questions);
  
      // Check if there is an existing response for this quizId and username
      let existingResponse = await Response.findOne({ quizId, username }).sort({ attempt: -1 });
  
      // If there is an existing response, increment the attempt count
      if (existingResponse) {
        existingResponse.attempt += 1;
        const newResponse = new Response({
          quizId,
          username,
          owner: quizData.username,
          title: quizData.title,
          attempt: existingResponse.attempt,
          questions: quizData.questions,
          score: score, // Store the calculated score
          timeTaken : duration-remaining
        });
        const savedResponse = await newResponse.save();
        res.status(200).json(savedResponse);
      } else {
        // If no existing response found, create a new response with attempt set to 0
        const newResponse = new Response({
          quizId,
          username,
          owner: quizData.username,
          title: quizData.title,
          questions: quizData.questions,
          attempt: 0,
          score: score, // Store the calculated score
          timeTaken : duration-remaining
        });
        const savedResponse = await newResponse.save(); // Save the new response
        res.status(201).json(savedResponse);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      res.status(500).json({ error: 'Failed to submit quiz' });
    }
  });

  module.exports = router;