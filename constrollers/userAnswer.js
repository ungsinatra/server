const UserTestAnswerer = require('../models/userTestAnswer');

module.exports.createAnswerControler = async (req, res) => {
  try {
    await UserTestAnswerer.create(req.body);
    res.json('Ответ успешно сохранен');
  } catch (e) {
    res.status(400).json(e.message);
  }
};

module.exports.getAllAnswersControler = async (req, res) => {
  try {
    const answers = await UserTestAnswerer.find({});
    res.json(answers);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

module.exports.getUserAnswersControler = async (req, res) => {
  try {
    const currentUserAnswers = await UserTestAnswerer.findById(req.params.id);
    res.json(currentUserAnswers);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

module.exports.updateUserAnswersController = async (req, res) => {
  try {
    const updatedTest = await UserTestAnswerer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTest);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

module.exports.removeUserAnswersController = async (req, res) => {
  try {
    const deleteUserAnswer = await UserTestAnswerer.findByIdAndDelete(req.params.id);
    res.json(deleteUserAnswer);
  } catch (e) {
    res.status(400).json(e.message);
  }
};
