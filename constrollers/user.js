const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  upadePartUser,
  getUser,
  createUser,
  updateUser,
  removeUser,
  getUsers,
} = require('../services/userService');
const User = require('../models/user');
const BadReqError = require('../Errors/BadReqError');
const NotFoundError = require('../Errors/NotFoundError');
const ConflictError = require('../Errors/ConflictError');

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    if (!user) {
      throw new Error('Неверный email или пароль');
    }
    const token = jwt.sign({ _id: user._id }, 'some-secret-key');
    res.json({ token, _id: user });
  } catch (err) {
    console.log(err)
    res.status(401).send({ message: err.message });
  }
};
module.exports.createUserController = async (req, res) => {
  try {
    const hashPass = await bcrypt.hash(req.body.password, 10);
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      throw new ConflictError('Адрес email уже зарегистрирован');
    }
    const userData = { ...req.body, password: hashPass };
    const user = await createUser(userData);
    res.json(user);
  } catch (err) {
    console.log(err)
    res.status(401).send({ message: err.message });
  }
};

module.exports.getUsersController = async (req, res) => {
  try {
    const users = await getUsers(req.body);
    res.status(200).json(users);
  } catch (e) {
    res.status(401).send({ message: err.message });
    
  }
};

// FIX
module.exports.getUserController = async (req, res) => {
  try {
    if (!req.params.id) {
      throw new BadReqError('Не указан ID');
    }
    const user = await getUser(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
};

module.exports.updateUserController = async (req, res) => {
  try {
    const updates = req.body;
    const prop = ['name', 'lastName', 'email', 'password', 'phone', 'gender', 'age', 'resume'];
    const isValidUpdate = Object.keys(updates)
      .every((update) => prop.includes(update));
    if (!isValidUpdate) {
      throw new BadReqError('Переданы не все поля!');
    }
    const user = await updateUser(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
};

module.exports.removeUserController = async (req, res) => {
  try {
    const removedUser = await removeUser(req.params.id);
    res.json(removedUser);
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
};

module.exports.upadeUserPartController = async (req, res) => {
  try {
    const updatedUser = await upadePartUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (err) {
    res.status(401).send({ message: err.message });  
  }
};
