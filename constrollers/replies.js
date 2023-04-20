const Replies = require("../models/replaies");

// C - Create
module.exports.createReplyController = async (req, res, next) => {
  try {
    const reply = await Replies.create(req.body);
    console.log(reply);
    res.status(201).json(reply);
  } catch (error) {
    next(error);
  }
};

// R - Read
module.exports.getReplyController = async (req, res, next) => {
  const { id: replyId } = req.params;
  try {
    const reply = await Replies.findById(replyId);
    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }
    res.json(reply);
  } catch (error) {
    next(error);
  }
};

module.exports.getsRepliesController = async (req, res, next) => {
  try {
    const replies = await Replies.find();
    res.json(replies);
  } catch (error) {
    next(error);
  }
};

// U - Update
module.exports.updateRepliesController = async (req, res, next) => {
  const { id: replyId } = req.params;
  try {
    const reply = await Replies.findByIdAndUpdate(replyId, req.body, { new: true });
    if (!reply) {
      return res.status(404).json({ message: "Отклик не найден!" });
    }
    res.json(reply);
  } catch (error) {
    next(error);
  }
};

// D - Delete
module.exports.deleteRepliesController = async (req, res, next) => {
  const { id: replyId } = req.params;
  try {
    const reply = await Replies.findByIdAndDelete(replyId);
    if (!reply) {
      return res.status(404).json({ message: "Отклик не найден!" });
    }
    res.sendStatus(204).json({message:'Отклик удален!'});
  } catch (error) {
    next(error);
  }
};