const mongoose = require('mongoose');

const { Schema } = mongoose;

const repliesSchema = new Schema({
    vacancyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vacancy',
        required: true,
    },
    userResumeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume',
        required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    userTestAnswer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})
const replaies = mongoose.model('Relpies', repliesSchema);
module.exports = replaies;
