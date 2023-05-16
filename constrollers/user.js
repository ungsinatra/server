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
const { BadReqError } = require('../Errors/BadReqError');
const { ConflictError } = require('../Errors/ConflictError');

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password) {
      throw new BadReqError('email или пароль не передан');
    }
    const user = await User.findUserByCredentials(email, password);
    if (!user) {
      throw new BadReqError('Неверный email или пароль');
    }
    const token = jwt.sign({ _id: user._id }, 'some-secret-key');
    res.status(200).json({ token, _id: user });
  } catch (err) {
    if (err instanceof BadReqError) {
      res.status(401).send({ message: err.message });
      return
    } else {
      res.status(500).json(err.message);
    }
  }
};
module.exports.createUserController = async (req, res) => {
  try {
    if (!req.body.password || !req.body.email) {
      throw new BadReqError('Пароль или Email не передан!');
    }
    const userExists = await User.findOne({ email: req.body.email });
    const hashPass = await bcrypt.hash(req.body.password, 10);
    if (userExists) {
      throw new ConflictError('Адрес email уже зарегистрирован');
    }
    const userData = { ...req.body, password: hashPass };
    const user = await createUser(userData);
    res.status(201).json(user);
  } catch (err) {
    if (err instanceof BadReqError) {
      res.status(401).send({ message: err.message });
      return
    }
    else if (err instanceof ConflictError) {
      res.status(409).send({ message: err.message });
      return
    }
    else {
      res.status(500).send({ message: err.message });
    }
  }
};

module.exports.getUsersController = async (req, res) => {
  try {
    const users = await getUsers(req.body);
    res.status(200).json(users);
  } catch (e) {
    res.status(401).send({ message: e.message });
  }
};

// FIX
module.exports.getUserController = async (req, res) => {
  try {
    console.log(req.user);
    const user = await getUser(req.user._id);
    res.status(200).json(user);
  } catch (err) {
    if (err instanceof BadReqError) {
      res.status(err.statusCode).send({ message: err.message });
      return
    } else {
      res.status(500).send({ message: err.message });
    }
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
    res.status(200).json(user);
  } catch (err) {
    if (err instanceof BadReqError) {
      res.status(err.statusCode).send({ message: err.message });
    } else {
      res.status(500).send({ message: err.message });
    }
  }
};

module.exports.removeUserController = async (req, res) => {
  try {
    const removedUser = await removeUser(req.params.id);
    res.status(200).json(removedUser);
  } catch (err) {
    res.status(err.statusCode).send({ message: err.message });
  }
};

module.exports.upadeUserPartController = async (req, res) => {
  try {
    const updatedUser = await upadePartUser(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
};
