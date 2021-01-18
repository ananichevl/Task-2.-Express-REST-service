const Joi = require('joi');

const addColumnScheme = Joi.object({
  title: Joi.string().required(),
  boardId: Joi.string().required()
});

module.exports = { addColumnScheme };
