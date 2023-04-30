const mongoose = require('mongoose');

const { Schema } = mongoose;

const socialsSchema = new Schema({
  email: String,
  telegram: String,
});

const workSchema = new Schema({
  nameOfCompany: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  startWork: String,
  endWork: String,
  position: {
    type: String,
    maxlength: 100,
  },
  responsibilities: String,
});

const resumeSchema = new Schema({
  name:{
    type: String,
    maxlength: 100,
  },
  lastName:{
    type: String,
    maxlength: 100,
  },
  age:{
    type: Number,
  },
  skills: {
    type: [String],
    minlength: 2,
    maxlength: 30,
    required: [true, 'Skills is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  socials: socialsSchema,
  job: [workSchema],
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  about: {
    type: String,
    maxlength: 1000,
  },
  additionally: {
    type: String,
    maxlength: 100,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const resume = mongoose.model('Resume', resumeSchema);
module.exports = resume;
