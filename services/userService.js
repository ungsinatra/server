const User = require('../models/user');
const BadReqError = require('../Errors/BadReqError');
const ConflictError = require('../Errors/ConflictError');
const NotFoundError = require('../Errors/NotFoundError');

module.exports.createUser = async (user) => {
  try {
    const createdUser = await User.create(user);
    return createdUser;
  } catch (error) {
    if (error.name === 'CastError') {
      throw new BadReqError('Не корректные данные! ');
    }
    throw new Error(error.message);
  }
};

module.exports.getUsers = async () => {
  const users = await User.find();
  return users;
};

// FIX
module.exports.getUser = async (_id) => {
    const user = await User.findById(_id).orFail(() => {
      throw new NotFoundError(`Пользователь с id ${_id} не найден!`);
    });
    return user;
};

module.exports.updateUser = async (_id, updates) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(_id, updates, { new: true, runValidators: true });
    return updatedUser;
  } catch (error) {
    if (error.name === 'CastError') {
      throw new NotFoundError(`Пользователь с id ${_id} не найден!`);
    }
    throw new Error(error.message);
  }
};

module.exports.removeUser = async (_id) => {
  try {
    const removedUser = await User.findByIdAndRemove(_id);
    return removedUser;
  } catch (err) {
    if (err.name === 'CastError') {
      throw new NotFoundError(`Пользователь с id ${_id} не найден!`);
    }
    throw new Error(err.message);
  }
};

module.exports.upadePartUser = async (_id, userData) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updates = userData;
    const allowedUpdates = ['name', 'lastName', 'email', 'password', 'phone', 'gender', 'age'];
    const isValidUpdate = Object.keys(updates).every((update) => allowedUpdates.includes(update));
    const user = await User.findById(_id);
    if (!user) {
      throw new NotFoundError(`Пользователь с id ${_id} не найден!`);
    }
    if (!isValidUpdate) {
      throw new ConflictError(`Переданые не корректные поля для имзменение:${[...allowedUpdates]}`);
    }

    Object.keys(updates).forEach((update) => {
      user[update] = updates[update];
    });
    const newUserData = await User.save();
    return newUserData;
  } catch (err) {
    throw new Error(err.message);
  }
};
