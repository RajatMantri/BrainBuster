const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    owner: String,
    quizId: String,
    username: String,
    attempt: Number,
    title: String,
    questions: [{
      id: Number,
      title: String,
      type: { type: String, enum: ['multipleChoice', 'trueFalse', 'paragraph'] },
      options: { type: [String], default: [] },
      correctAnswer: { type: mongoose.Schema.Types.Mixed, default: null },
      selectedAnswer: { type: mongoose.Schema.Types.Mixed, default: null }
    }],
    score: { type: Number, default: 0 }
  });

  module.exports = mongoose.model('Response',responseSchema);