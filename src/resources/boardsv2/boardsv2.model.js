const uuid = require('uuid');
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: String,
  _id: {
    type: String,
    default: uuid
  }
});

boardSchema.virtual('columns', {
  ref: 'Column',
  localField: '_id',
  foreignField: 'boardId',
  justOne: false
});

const Boardv2 = mongoose.model('Boardv2', boardSchema);

module.exports = Boardv2;
