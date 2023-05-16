const Chat = require('../models/chat');
const User = require('../models/user')
module.exports.createChat = async (chatData) => {
  try {
    const chat = await Chat.create(chatData);
    return await chat.save();
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports.getAllChats = async () => {
  try {
    return await Chat.find();
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports.getUserAllDialog = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    console.log(id)
    throw new Error('Нету Id ')
  }
  console.log(id)
  const chatlist = await Chat.findUserChats(id);
  if (chatlist.length === 0) {
    return res.status(200).json([]);
  }
  res.status(200).json(chatlist);
}

module.exports.getChatById = async (chatId) => {
  try {
    return await Chat.findById(chatId);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports.updateChat = async (chatId, chatData) => {
  try {
    return await Chat.findByIdAndUpdate(chatId, chatData);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports.deleteChat = async (chatId) => {
  try {
    return await Chat.findByIdAndDelete(chatId);
  } catch (error) {
    throw new Error(error.message);
  }
}