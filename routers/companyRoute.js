const express = require('express');

const {
  getCompanyById, getCompanies, deleteCompanyById, createCompany, updateCompanyById,
} = require('../constrollers/compony');

const router = express.Router();

router.post('/', createCompany);
router.get('/', getCompanies);
router.get('/:id', getCompanyById);
router.patch('/:id', updateCompanyById);
router.delete('/:id', deleteCompanyById);

module.exports = router;
