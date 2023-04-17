const mongoose = require('mongoose');

const { Schema } = mongoose;

const companySchema = new Schema({
  name: {
    type: String,
    maxLength: 50,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Некорректный email',
    },
  },
  vacancies: [{ type: Schema.Types.ObjectId, ref: 'Vacancy' }],

  password: {
    type: String,
    maxLength: 50,
    minLength: 6,
    require: true,
  },
});

const company = mongoose.model('Company', companySchema);
module.exports = company;
