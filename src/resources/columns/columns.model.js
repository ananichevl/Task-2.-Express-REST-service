const uuid = require('uuid');
const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
  title: String,
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

columnSchema.statics.toResponse = obj => {
  const { id, title } = obj;
  return { id, title };
};

const Column = mongoose.model('Column', columnSchema);

module.exports = Column;
