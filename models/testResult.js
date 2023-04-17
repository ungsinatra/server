const mongoose = require('mongoose');

const userTestResultSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  test: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tests',
    required: true,
  },
  answers: [{
    question: {
      type: mongoose.Schema.ObjectId,
      ref: 'Question',
      required: true,
    },
    userAnswer: String, // ответ пользователя
    isCorrect: Boolean, // правильный ли ответ
  }],
  date: {
    type: Date,
    default: Date.now,
  },
});
const testResults = mongoose.models('TestsResult', userTestResultSchema);
module.exports = testResults;
