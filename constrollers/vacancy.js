const Vacancy = require('../models/vacancy');
const VacanciesTest = require('../models/VacanciesTest');
const Company = require('../models/company');
const {updateUser} = require('../services/userService')
const {BadReqError} = require('../Errors/BadReqError');
const {NotFoundError} = require('../Errors/NotFoundError');

module.exports.createVacancyController = async (req, res) => {
  try {
    const { vacancyData, testData,company } = req.body;
    const createCompany = await Company.create(company)
    console.log(createCompany);
    const test = await VacanciesTest.create({...testData,company:createCompany._id});
    if (!test) {
      throw new BadReqError('Ошибка тесты где??');
    }
    console.log(test);
    const createdVacancy = await Vacancy.create({
      ...vacancyData,
      testId: test._id,
      company:createCompany._id,
    });
    const updateTest = await VacanciesTest.findByIdAndUpdate(test._id,{vacancyId:createdVacancy._id},{new:true})
    const updatedUser = await updateUser(company.userId,{vacancy:createdVacancy._id});
    console.log(updatedUser);
    if (!createdVacancy) {
      throw new BadReqError('Ошибка при создании вакансии');
    }

    res.status(201).json({createdVacancy,updateTest});
  } catch (err) {
    if (err instanceof BadReqError) {
      res.status(err.statusCode).json({ error: err.message });
    } else if (err instanceof NotFoundError) {
      res.status(err.statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: err.message });
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
