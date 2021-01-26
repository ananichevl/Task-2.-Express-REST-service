const User = require('./user.model');
const Task = require('../tasks/tasks.model');

const getAll = async () => {
  return User.find({});
};

const addUser = async user => {
  await user.save();
  return user;
};

const findUser = async login => {
  return User.findOne({ login });
};

const getById = async id => {
  return User.findOne({ _id: id });
};

const deleteById = async id => {
  const ok = (await User.deleteOne({ _id: id })).deletedCount;
  await Task.updateMany({ userId: id }, { userId: '' });
  return ok;
};

const update = async ({ name, login, password, id }) => {
  return User.updateOne({ _id: id }, { name, login, password });
};

module.exports = { getAll, addUser, getById, deleteById, update, findUser };
