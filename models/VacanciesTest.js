const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  text: String,
  options: [String],
  answer: String,
});

const testSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 50,
  },
  description: {
    type: String,
    maxLength: 1000,
  },
  questions: [questionSchema],
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
});
const test = mongoose.model('Tests', testSchema);
module.exports = test;
