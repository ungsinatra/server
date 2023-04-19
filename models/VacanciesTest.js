const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
  id: { type: Number, required: true },
  answer: { type: String, required: true },
});

const questionSchema = mongoose.Schema({
  quation: String,
  type:{type:String,enum:["choice", "text"],required:true},
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
    required:true
  }
});
const test = mongoose.model('Tests', testSchema);
module.exports = test;
