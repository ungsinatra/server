const express = require('express');
const {deleteRepliesController,getReplyController,createReplyController,getsRepliesController,updateRepliesController } = require('../constrollers/replies');

const router = express.Router();

router.post('/', createReplyController);
router.get('/', getsRepliesController);
router.get('/:id', getReplyController);
router.put('/:id', updateRepliesController);
router.delete('/:id', deleteRepliesController);

module.exports = router;
