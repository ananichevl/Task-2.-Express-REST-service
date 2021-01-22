const uuid = require('uuid');
const mongoose = require('mongoose');
const Task = require('../tasks/tasks.model');

const columnSchema = new mongoose.Schema({
  title: String,
  order: Number,
  _id: {
    type: String,
    default: uuid
  },
  boardId: {
    type: String,
    default: '',
    get: v => (v ? v : null)
  }
});

columnSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'columnId',
  justOne: false
});

columnSchema.pre('remove', { query: true, document: false }, function (next) {
  Task.remove({ columnId: this._conditions._id }).exec();
  next();
});

columnSchema.statics.toResponse = obj => {
  const { id, title } = obj;
  return { id, title };
};

const Column = mongoose.model('Column', columnSchema);

module.exports = Column;
