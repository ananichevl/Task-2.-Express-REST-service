const uuid = require('uuid');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: String,
  password: String,
  _id: {
    type: String,
    default: uuid
  }
});

userSchema.statics.toResponse = obj => {
  const { id, login, token } = obj;
  return { id, login, token };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
