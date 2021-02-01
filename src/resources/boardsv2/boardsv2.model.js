const uuid = require('uuid');
const mongoose = require('mongoose');
const Column = require('../columns/columns.model');
const Task = require('../tasks/tasks.model');

const boardSchema = new mongoose.Schema({
  title: String,
  _id: {
    type: String,
    default: uuid
  },
  userId: {
    type: String,
    default: '',
    get: v => (v ? v : null)
  },
  background: {
    type: String,
    default: '#CCCCFF'
  }
});

boardSchema.virtual('columns', {
  ref: 'Column',
  localField: '_id',
  foreignField: 'boardId',
  justOne: false
});

boardSchema.pre('remove', { query: true, document: false }, async function (next) {
  const columns = await Column.find({ boardId: this._conditions._id });
  const columnIds = columns.map((item) => item._id);
  Task.remove({ columnId: { $in: columnIds } }).exec();
  Column.remove({ boardId: this._conditions._id }).exec();
  next();
});

const Boardv2 = mongoose.model('Boardv2', boardSchema);

module.exports = Boardv2;
