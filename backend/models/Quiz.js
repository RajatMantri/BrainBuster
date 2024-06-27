const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new mongoose.Schema({
    username: String,
    title: String,
    questions: [{
      id: Number,
      title: String,
      type: { type: String, enum: ['multipleChoice', 'trueFalse', 'paragraph'] },
      options: { type: [String], default: [] },
      correctAnswer: { type: mongoose.Schema.Types.Mixed, default: null },
      selectedAnswer: { type: mongoose.Schema.Types.Mixed, default: null }
    }]
  });

  module.exports = mongoose.model('Quiz',quizSchema);