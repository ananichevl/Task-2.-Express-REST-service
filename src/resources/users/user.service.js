const boom = require('boom');
const jwt = require('jsonwebtoken');
const usersRepo = require('./user.db.repository');
const User = require('./user.model');
const argon2 = require('argon2');
const { newUser } = require('./user.schema');
const { JWT_SECRET_KEY } = require('../../common/config');

const getAll = () => usersRepo.getAll();

const addUser = async (login, password) => {
  const { error } = newUser.validate({ login, password });
  if (error) throw boom.badRequest(error.message, { request: 'addUser' });
  const passwordHashed = await argon2.hash(password);
  const user = new User({ login, password: passwordHashed });
  const dbUser = await usersRepo.addUser(user);
  const token = generateToken(dbUser);
  return { id: dbUser._id, login: dbUser.login, token };
};

const loginUser = async (login, password) => {
  const { error } = newUser.validate({ login, password });
  if (error) throw boom.badRequest(error.message, { request: 'loginUser' });
  const user = await usersRepo.findUser(login);
  if (!user) {
    throw boom.notFound(error.message, { request: 'loginUser' });
  } else {
    const correctPassword = await argon2.verify(user.password, password);
    if (!correctPassword) {
      throw boom.unauthorized('Incorrect user or password', { request: 'loginUser' });
    }
  }
  const token = generateToken(user);
  return { id: user._id, login: user.login, token };
};

const getById = async id => {
  const user = await usersRepo.getById(id);
  if (!user) {
    throw boom.notFound("This user doesn't exist", { request: 'getByIdUser' });
  }
  return user;
};

const updateUser = async (name, login, password, id) => {
  const { error } = newUser.validate({ name, login, password });
  if (error) throw boom.badRequest(error.message, { request: 'updateUser' });
  return usersRepo.update({ name, login, password, id });
};
const deleteById = id => usersRepo.deleteById(id);

const generateToken = (user) => {
  return jwt.sign({ id: user._id, login: user.login }, JWT_SECRET_KEY, { expiresIn: '1800s' });
};

module.exports = {
  getAll,
  addUser,
  getById,
  deleteById,
  updateUser,
  loginUser
};
