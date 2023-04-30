const mongoose = require('mongoose');

const replyUsers = mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    default: [],
    index: { unique: false }
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
  repliesUsers:{
    type: [String],
    required: false
  }
});
vacancySchema.statics.updateVacancyProps = async function (_id,data) {
  try {
    const findVacancy = await this.findById(_id);
    const updatedVacancy = await this.findByIdAndUpdate(_id, {repliesUsers: [...findVacancy.repliesUsers,...data] }, { new: true });
    console.log(updatedVacancy);
    console.log(updatedVacancy);
    return updatedVacancy;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const vacancy = mongoose.model('Vacancy', vacancySchema);
module.exports = vacancy;
