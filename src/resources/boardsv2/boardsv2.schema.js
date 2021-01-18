const Joi = require('joi');

const newBoard = Joi.object({
  title: Joi.string().required()
});

module.exports = { newBoard };
