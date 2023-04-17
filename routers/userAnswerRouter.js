const express = require('express');

const {
  updateUserAnswersController, removeUserAnswersController, createAnswerControler, getUserAnswersControler,
} = require('../constrollers/userAnswer');

const router = express.Router();

router.post('/', createAnswerControler);
router.get('/:id', getUserAnswersControler);
router.put('/:id', updateUserAnswersController);
router.delete('/:id', removeUserAnswersController);

module.exports = router;
