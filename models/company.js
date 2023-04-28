const mongoose = require('mongoose');

const { Schema } = mongoose;

const companySchema = new Schema({
  name: {
    type: String,
    maxLength: 50,
    require: true,
  },
  about: {
    type: String,
    maxLength: 200,
    require: true,
  },
  userId:{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  vacancies: [{ type: Schema.Types.ObjectId, ref: 'Vacancy' }],
});

const company = mongoose.model('Company', companySchema);
module.exports = company;
