const mongoose = require('mongoose');

const replyUsers = mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:false
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
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const updatedVacancy = await Vacancy.findByIdAndUpdate(vacancyId, data, { new: true, session });
    await session.commitTransaction();
    session.endSession();
    return updatedVacancy;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error.message);
    return null;
  }
};

const vacancy = mongoose.model('Vacancy', vacancySchema);
module.exports = vacancy;
