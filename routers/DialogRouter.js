
const express = require('express');
const router = express.Router();
const { createChat, deleteChat, getAllChats, getChatById, updateChat, getUserAllDialog } = require('../constrollers/chat');



router.get('/', getAllChats);
router.post('/', createChat);
router.get('/:id', getUserAllDialog);
router.put('/:id', updateChat);
router.delete('/:id', deleteChat);


module.exports = router;
