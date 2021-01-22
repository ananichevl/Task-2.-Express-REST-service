const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  order: Number,
  description: String,
  columnId: {
    type: String,
    default: '',
    get: v => (v ? v : null)
  },
  userId: {
    type: String,
    default: '',
    get: v => (v ? v : null)
  },
  _id: {
    type: String,
    default: uuid
  }
});

taskSchema.statics.toResponse = obj => {
  const { id, title, order, description, userId, columnId } = obj;
  return { id, title, order, description, userId, columnId };
};

const Task = mongoose.model('Task', taskSchema);
// class Task {
//   constructor({
//     id = uuid(),
//     title = 'title',
//     order = 'order',
//     description = 'P@description',
//     boardId = 'boardId',
//     columnId = 'columnId',
//     userId = 'userId'
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.order = order;
//     this.description = description;
//     this.boardId = boardId;
//     this.columnId = columnId;
//     this.userId = userId;
//   }
//
//   toResponse() {
//     const { id, title, order, description, userId, boardId, columnId } = this;
//     return { id, title, order, description, userId, boardId, columnId };
//   }
//
//   update({ title, order, description, userId, boardId, columnId }) {
//     this.title = title;
//     this.order = order;
//     this.description = description;
//     this.boardId = boardId;
//     this.columnId = columnId;
//     this.userId = userId;
//   }
// }

module.exports = Task;
