const Joi = require('joi');

const newBoard = Joi.object({
  title: Joi.string().required()
});

const updateBoard = Joi.object({
  title: Joi.string().allow(null)
});

module.exports = { newBoard, updateBoard };
