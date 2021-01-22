const Joi = require('joi');

const taskCreate = Joi.object({
  title: Joi.string().required(),
  order: Joi.number()
    .integer()
    .min(0)
    .required(),
  description: Joi.string().allow(null),
  userId: Joi.string().allow(null),
  columnId: Joi.string().allow(null)
});

const taskUpdate = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().allow(null),
  order: Joi.number()
      .integer()
      .min(0)
      .allow(null),
  description: Joi.string().allow(null),
  userId: Joi.string().allow(null),
  columnId: Joi.string().allow(null),
  newColumnId: Joi.string().allow(null)
});

module.exports = { taskCreate, taskUpdate };
