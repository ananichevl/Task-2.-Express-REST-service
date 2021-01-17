const Joi = require('joi');

const task = Joi.object({
  title: Joi.string().required(),
  order: Joi.number()
    .integer()
    .min(0)
    .required(),
  description: Joi.string().allow(null),
  userId: Joi.string().allow(null),
  boardId: Joi.string()
    .allow(null)
    .required(),
  columnId: Joi.string().allow(null)
});

module.exports = task;
