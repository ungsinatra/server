const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
  _id: { type: String, required: true },
  answer: { type: String, required: false },
});

const questionSchema = mongoose.Schema({
  question: String,
  type: { type: String, enum: ["choice", "text", "code"], required: true },
  answers: [answerSchema],
});
const userTestAnswerSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    uniqe: true,
    required: true,
  },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tests',
    required: true,
  },
  // testQuations: [questionSchema],
  answers: [
    {
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
  createdDate: {
    type: Date,
    default: Date.now,
  },
});
const userAnswer = mongoose.model('UserAnswerTest', userTestAnswerSchema);
module.exports = userAnswer;
