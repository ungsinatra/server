const mongoose = require('mongoose');

const { Schema } = mongoose;

const acceptedSchema = new Schema({
    isAccepted: { type: String, enum: ['invite ', 'deny', 'pending'], },
    message: { type: String },
    senderId: { type: Schema.Types.ObjectId, ref: 'User' },
    receiverId: { type: Schema.Types.ObjectId, ref: 'User' },
});


const repliesSchema = new Schema({
    vacancyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vacancy',
        required: true,
    },
    userResumeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume',
        required: true,
    },
    accepted: {
        type: acceptedSchema,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    vacancyName: {
        type: "String",
        required: true
    },
    userName: {
        type: "String",
        required: true
    },
    userTestAnswer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    createdDate: {
        type: Date,
        default: Date.now,
    },
})
const replaies = mongoose.model('Relpies', repliesSchema);
module.exports = replaies;
