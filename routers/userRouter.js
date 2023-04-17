const express = require('express');
const {
  upadeUserPartController, getUsersController, updateUserController, removeUserController, getUserController,
} = require('../constrollers/user');

const router = express.Router();

router.get('/', getUsersController);
router.get('/:id', getUserController);
router.put('/:id', updateUserController);
router.patch('/:id', upadeUserPartController);
router.delete('/:id', removeUserController);

module.exports = router;
