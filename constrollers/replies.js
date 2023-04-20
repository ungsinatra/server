const Replies = require("../models/replaies");
const userAnswer = require("../models/userTestAnswer");
const {BadReqError} = require ('../Errors/BadReqError');
// C - Create
module.exports.createReplyController = async (req, res, next) => {
  try {
    const {answerData,replyData} = req.body;
    const userAnswerData = await userAnswer.create(answerData);
    if(!userAnswerData){
         throw new BadReqError('Ответы не переданы!');  
    }
    await Replies.create({
        ...replyData,
        userTestAnswer:userAnswerData._id
    });
    res.status(201).json({message:'Отклик осущетвлен'});
  } catch (error) {
    console.log(error.message)
    if(error instanceof BadReqError){
        res.status(error.statusCode).json({message:error.message})
    }
    next(error);
  }
};

// R - Read
module.exports.getReplyController = async (req, res, next) => {
  const { id: replyId } = req.params;
  try {
    const reply = await Replies.findById(replyId);
    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }
    res.json(reply);
  } catch (error) {
    next(error);
  }
};

module.exports.getsRepliesController = async (req, res, next) => {
  try {
    const replies = await Replies.find();
    res.json(replies);
  } catch (error) {
    next(error);
  }
};

// U - Update
module.exports.updateRepliesController = async (req, res, next) => {
  const { id: replyId } = req.params;
  try {
    const reply = await Replies.findByIdAndUpdate(replyId, req.body, { new: true });
    if (!reply) {
      return res.status(404).json({ message: "Отклик не найден!" });
    }
    res.json(reply);
  } catch (error) {
    next(error);
  }
};

// D - Delete
module.exports.deleteRepliesController = async (req, res, next) => {
  const { id: replyId } = req.params;
  try {
    const reply = await Replies.findByIdAndDelete(replyId);
    if (!reply) {
      return res.status(404).json({ message: "Отклик не найден!" });
    }
    res.sendStatus(204).json({message:'Отклик удален!'});
  } catch (error) {
    next(error);
  }
};