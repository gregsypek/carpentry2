const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Proszę podać imię'],
  },
  email: {
    type: String,
    required: [true, 'Proszę podać swój email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Proszę podać prawidłowy email'],
  },
  password: {
    type: String,
    required: [true, 'Proszę podać hasło'],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Proszę potwierdzić hasło'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
