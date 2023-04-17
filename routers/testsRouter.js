const express = require('express');
const {
  updateTestController,
  removeTestController,
  createTestControler,
  getCurrentTestController,
  getTestsController,
} = require('../constrollers/tests');

const router = express.Router();

router.post('/', createTestControler);
router.get('/', getTestsController);
router.get('/:id', getCurrentTestController);
router.put('/:id', updateTestController);
router.delete('/:id', removeTestController);

module.exports = router;
