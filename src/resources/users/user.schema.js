const Joi = require('joi');

const newUser = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required()
});

module.exports.newUser = newUser;
