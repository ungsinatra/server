const mongoose = require('mongoose');

const replyUsers = mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:true
  }
})

const vacancySchema = mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  location: { type: String, required: true },
  responsibilities: [{ type: String }],
  qualifications: [{ type: String }],
  benefits: [{ type: String }],
  date: { type: Date, required: true,default: Date.now  },
  direction: { type: String, required: true },
  occupied:{type:String,require:true},
  graid:{
    type: String,
    enum: ['intern','junior', 'middle','senior','lead'],
    required: false,
  },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tests',
    required: true,
  },
  repliesUsers:[replyUsers]
});
vacancySchema.statics.updateVacancyProps = async function (_id,data) {
  try {
    console.log(data);
    const result = await this.findByIdAndUpdate(_id, data, { new: true });
    return result;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const vacancy = mongoose.model('Vacancy', vacancySchema);
module.exports = vacancy;
