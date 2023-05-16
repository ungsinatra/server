
const { BadReqError } = require('../Errors/BadReqError');
const Chats = require('../models/chat');
const express = require('express');
const router = express.Router();

const getChat = async (req, res) => {
  try {
    const { id } = req.params;
    if (id == null) {
      throw new BadReqError('Не передан ')
    }
    const chat = await Chats.findById(id);
    res.json(chat);
  } catch (error) {
    if (error instanceof BadReqError) {
      res.status(error.statusCode).json('Id не передан')
    }
    res.status(500).json({ message: error.message });

  }
}

router.get('/:id', getChat)


module.exports = router;