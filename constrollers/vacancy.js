const Vacancy = require('../models/vacancy');
const VacanciesTest = require('../models/VacanciesTest');
const BadReqError = require('../Errors/BadReqError');
const NotFoundError = require('../Errors/NotFoundError');

module.exports.createVacancyController = async (req, res) => {
  try {
    const { vacancyData, testData } = req.body;
    const test = await VacanciesTest.create(testData);
    if (!test) {
      throw new BadReqError('Ошибка тесты где??');
    }

    const createdVacancy = await Vacancy.create({
      ...vacancyData,
      testId: test._id,
    });

    if (!createdVacancy) {
      throw new BadReqError('Ошибка при создании вакансии');
    }

    res.json(createdVacancy);
  } catch (err) {
    if (err instanceof BadReqError) {
      res.status(400).json({ error: err.message });
    } else if (err instanceof NotFoundError) {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Something went wrong!' });
    }
  }
};

module.exports.getVacanciesController = async (req, res) => {
  try {
    const vacancies = await Vacancy.find({});
    if (!vacancies) {
      throw new BadReqError('Ошибка при получение вакансии');
    }
    res.json(vacancies);
  } catch (err) {
    if (err instanceof BadReqError) {
      res.status(400).json({ error: err.message });
    } else if (err instanceof NotFoundError) {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Something went wrong!' });
    }
  }
};

module.exports.getVacancyController = async (req, res) => {
  try {
    if (!req.params.id) {
      throw new BadReqError('Не указан ID');
    }
    const vacancy = await Vacancy.findById(req.params.id);
    res.json(vacancy);
  } catch (err) {
    if (err instanceof BadReqError) {
      res.status(400).json({ error: err.message });
    } else if (err instanceof NotFoundError) {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Something went wrong!' });
    }
  }
};

module.exports.updateVacancyController = async (req, res) => {
  try {
    const { id } = req.params;
    const newVacancyData = req.body;
    const updatedVacancy = await Vacancy.findByIdAndUpdate(id, newVacancyData, { new: true, runValidators: true });
    res.json(updatedVacancy);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).json('Вакансия не найдена!');
    }
    if (err instanceof NotFoundError) {
      res.status(404).json({ error: err.message });
    } else if (err instanceof BadReqError) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Something went wrong!' });
    }
  }
};

module.exports.deleteVacancyController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVacancy = await Vacancy.findByIdAndDelete(id);
    if (!deletedVacancy) {
      throw new NotFoundError('Вакансия не найдена');
    }
    res.json(deletedVacancy);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Something went wrong!' });
    }
  }
};
