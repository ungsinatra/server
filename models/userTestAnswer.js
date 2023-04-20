const mongoose = require('mongoose');

const userTestAnswerSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tests',
    required: true,
  },
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
