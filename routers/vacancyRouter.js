const express = require('express');

const {
  deleteVacancyController,
  updateVacancyController, createVacancyController, getVacancyController, getVacanciesController,
} = require('../constrollers/vacancy');

const router = express.Router();

router.post('/', createVacancyController);
router.get('/', getVacanciesController);
router.get('/:id', getVacancyController);
router.put('/:id', updateVacancyController);
router.delete('/:id', deleteVacancyController);

module.exports = router;
