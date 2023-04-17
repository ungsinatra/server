const Company = require('../models/company');
const BadReqError = require('../Errors/BadReqError');
const NotFoundError = require('../Errors/NotFoundError');

module.exports.createCompany = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const company = await Company.create({ name, email, password });
    res.json({ message: 'Компания успешно создана', company });
  } catch (error) {
    if (error.code === 11000) {
      next(new BadReqError('Компания с таким email уже существует'));
    }
  }
};

module.exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().populate('vacancies');
    res.json(companies);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports.getCompanyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id).populate('vacancies');
    if (!company) {
      next(new NotFoundError('Компания не найдена'));
    }
    res.json(company);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      next(new BadReqError('Некорректный ID компании'));
    }
  }
};

module.exports.updateCompanyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const company = await Company.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true, runValidators: true },
    ).populate('vacancies');
    if (!company) {
      next(new NotFoundError('Компания не найдена'));
    }
    res.json({ message: 'Компания успешно обновлена', company });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      next(new BadReqError('Некорректный ID компании'));
    }
    if (error.code === 11000) {
      next(new BadReqError('Компания с таким email уже существует'));
    }
  }
};

module.exports.deleteCompanyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const company = await Company.findByIdAndDelete(id);
    if (!company) {
      next(new NotFoundError('Компания не найдена'));
    }
    res.json({ message: 'Компания успешно удалена' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      next(new BadReqError('Некорректный ID компании'));
    }
  }
};
