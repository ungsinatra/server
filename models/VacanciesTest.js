const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
  _id: { type: String, required: true },
  answer: { type: String, required: false },
});

const questionSchema = mongoose.Schema({
  question: String,
  type:{type:String,enum:["choice", "text","code"],required:true},
  answers: [answerSchema],
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
  vacancyId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Vacancy",
  }
});
const test = mongoose.model('Tests', testSchema);
module.exports = test;
