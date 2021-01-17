const Joi = require('joi');

const newBoard = Joi.object({
  title: Joi.string().required()
});

const addColumnScheme = Joi.object({
  id: Joi.string().required(),
  columnTitle: Joi.string().required()
});

module.exports = { newBoard, addColumnScheme };
