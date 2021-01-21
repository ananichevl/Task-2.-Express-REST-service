const Task = require('./tasks.model');

const getTasksByBoardId = async boardId => Task.find({ boardId });

const addTask = async task => {
  await task.save();
  return task;
};

const update = async ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
  taskId
}) =>
  Task.findOneAndUpdate(
    { _id: taskId },
    { title, order, description, userId, boardId, columnId, _id: taskId },
    { new: true }
  );

const deleteTask = async ({ taskId }) => {
  return (await Task.deleteOne({ _id: taskId })).deletedCount;
};

const findTask = async ({ taskId, boardId }) =>
  Task.findOne({ _id: taskId, boardId });

module.exports = { getTasksByBoardId, deleteTask, addTask, findTask, update };
