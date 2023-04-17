const VacanciesTest = require('../models/VacanciesTest');

module.exports.createTestControler = async (req, res) => {
  try {
    const test = await VacanciesTest.create(req.body);
    res.json(`Тест успешно создан,${test._id}`);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

module.exports.getTestsController = async (req, res) => {
  try {
    const tests = await VacanciesTest.find({});
    res.json(tests);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

module.exports.getCurrentTestController = async (req, res) => {
  try {
    const currentTest = await VacanciesTest.findById(req.params.id);
    res.json(currentTest);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

module.exports.updateTestController = async (req, res) => {
  try {
    const updatedTest = await VacanciesTest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTest);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

module.exports.removeTestController = async (req, res) => {
  try {
    const deletedTest = await VacanciesTest.findByIdAndDelete(req.params.id);
    res.json(deletedTest);
  } catch (e) {
    res.status(400).json(e.message);
  }
};
