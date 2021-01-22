const Joi = require('joi');

const addColumnScheme = Joi.object({
  title: Joi.string().required(),
  order: Joi.number().required(),
  boardId: Joi.string().required()
});

const updateColumnScheme = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().allow(null),
  order: Joi.number().allow(null)
});

const deleteColumnScheme = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required()
});

const getColumnScheme = Joi.object({
  columnId: Joi.string().required()
});

module.exports = { addColumnScheme, updateColumnScheme, deleteColumnScheme, getColumnScheme };
