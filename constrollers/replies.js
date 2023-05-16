const Replies = require("../models/replaies");
const userAnswer = require("../models/userTestAnswer");
const vacancy = require('../models/vacancy')
const { BadReqError } = require('../Errors/BadReqError');
const { ConflictError } = require('../Errors/ConflictError');
const { getUserAnswersControler } = require('../constrollers/userAnswer')
const { createChat } = require('../constrollers/chat')
// C - Create

module.exports.createReplyController = async (req, res, next) => {
  try {
    const { answerData, replyData } = req.body;
    const vacancyUpdate = await vacancy.updateVacancyProps(replyData.vacancyId, [replyData.userId]);
    console.log(vacancyUpdate);
    if (!vacancyUpdate) {
      throw new ConflictError('Вакансия не обновлена');
    }
    const userAnswerData = await userAnswer.create(answerData);
    if (!userAnswerData) {
      throw new BadReqError('Ответы не переданы!');
    }
    await Replies.create({
      ...replyData,
      userTestAnswer: userAnswerData._id
    });
    res.status(201).json({ message: 'Отклик осуществлен', vacancyUpdate });
  } catch (error) {
    console.log(error.message)
    if (error instanceof BadReqError) {
      res.status(error.statusCode).json({ message: error.message })
    } else if (error instanceof ConflictError) {
      res.status(error.statusCode).json({ message: error.message });
    }
    else {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
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

const { Types } = require('mongoose');
const chatMessage = require("../models/chat");

module.exports.getRepliesByUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new ConflictError('Id не передан');
    }
    const userReplies = await Replies.find({ userId: id });
    if (userReplies.length <= 0) {
      res.json({ message: 'у пользователя нету откликов', replies: [] })
    }
    // Объединяем ответы и ответы пользователя в один объект
    const combinedRepliesAndAnswers = [];
    for (let reply of userReplies) {
      // if (!reply.testId) {
      //   throw new BadReqError(`В записи ответа пользователя ${reply._id} отсутствует идентификатор теста`);
      // }
      console.log(reply.userTestAnswer)
      const answers = await userAnswer.findById({ _id: reply.userTestAnswer });
      console.log(answers)
      combinedRepliesAndAnswers.push({
        replyData: reply,
        userAnswerData: answers.toObject()
      });
    }

    console.log(combinedRepliesAndAnswers)
    res.json(combinedRepliesAndAnswers);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

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
    console.log(replyId)
    const reply = await Replies.findByIdAndUpdate(replyId, req.body, { new: true });
    if (!reply) {
      return res.status(404).json({ message: "Oaken не найден!" });
    }
    res.json(reply);
  } catch (error) {
    console.log(error)
    next(error);
  }
};
module.exports.AnswerOnRepliesController = async (req, res, next) => {
  console.log('resoponse');
  console.log(req.params)
  const { id: replyId } = req.params;
  const { chat, replyData } = req.body
  try {
    if (!replyId) {
      throw new ConflictError('Id не передан');
    }
    const reply = await Replies.findByIdAndUpdate(replyId, replyData, { new: true });

    if (!reply) {
      return res.status(404).json({ message: "отклик не найден!" });
    }
    const createDialog = await createChat(chat);
    res.status(201).json({ reply, chat });
  } catch (error) {
    console.log(error)
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
    res.sendStatus(204).json({ message: 'Отклик удален!' });
  } catch (error) {
    next(error);
  }
};