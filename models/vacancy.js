const mongoose = require('mongoose');

const vacancySchema = mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  location: { type: String, required: true },
  responsibilities: [{ type: String }],
  qualifications: [{ type: String }],
  benefits: [{ type: String }],
  date: { type: Date, required: true },
  direction: { type: String, required: true },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tests',
    required: true,
  },
});
const vacancy = mongoose.model('Vacancy', vacancySchema);
module.exports = vacancy;
