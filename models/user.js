const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    maxLength: 30,
    minLength: 2,
  },
  lastName: {
    type: String,
    require: true,
    maxLength: 30,
    minLength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    minLength: 8,
    require: true,
    select: false,
  },
  phone: {
    type: String,
    required: false,
    validate: {
      validator: (value) => {
        const phoneRegex = /^\+?\d{1,3}[- ]?\d{2,3}[- ]?\d{2,4}[- ]?\d{1,4}$/;
        return phoneRegex.test(value);
      },
      message: 'Некорректный номер телефона',
    },
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: false,
  },
  age: {
    type: Number,
    require: false,
    validate: { // опишем свойство validate
      validator(v) { // validator - функция проверки данных. v - значение свойства age
        return v >= 16; // если возраст меньше 18, вернётся false
      },
      message: 'Вам должно быть больше 16 лет!', // когда validator вернёт false, будет использовано это сообщение
    },
  },
  resume: {
    type: mongoose.Schema.Types.ObjectId,
    require: false,
    ref: 'Resume',
  },

});
userSchema.statics.findUserByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    throw new Error('Неправильные почта или пароль');
  }
  try {
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new Error('Неправильные почта или пароль');
    }
    return user;
  } catch (error) {
    throw new Error('Ошибка проверки пароля');
  }
};

const user = mongoose.model('user', userSchema);
module.exports = user;
