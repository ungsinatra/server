const express = require('express');

const {
  deleteVacancyController,
  updateVacancyController, createVacancyController, getVacancyController, getVacanciesController, getMyVacanciesController
} = require('../constrollers/vacancy');

const router = express.Router();

router.post('/', createVacancyController);
router.get('/', getVacanciesController);
router.get('/me/:id', getMyVacanciesController);
router.get('/:id', getVacancyController);
router.put('/:id', updateVacancyController);
router.delete('/:id', deleteVacancyController);

module.exports = router;
