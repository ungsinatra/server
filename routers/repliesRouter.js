const express = require('express');
const { deleteRepliesController, getReplyController, createReplyController, getsRepliesController, updateRepliesController, getRepliesByUserId, AnswerOnRepliesController } = require('../constrollers/replies');

const router = express.Router();

router.post('/', createReplyController);
router.get('/', getsRepliesController);
router.get('/me/:id', getRepliesByUserId);
router.put('/answer/:id', AnswerOnRepliesController);

router.get('/:id', getReplyController);
router.put('/:id', updateRepliesController);
router.delete('/:id', deleteRepliesController);

module.exports = router;
