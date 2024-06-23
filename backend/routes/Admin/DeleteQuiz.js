// routes/Admin/DeleteQuiz.js

const express = require('express');
const router = express.Router();
const Quiz = require('../../models/Quiz.js');

router.delete('/quizzes/:quizId', async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
    if (!deletedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
