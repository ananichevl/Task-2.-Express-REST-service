const Task = require('./tasks.model');

const getTasksByColumnId = async columnId => Task.find({ columnId }, null, { sort: { order: 1 } });

const addTask = async task => {
  await task.save();
  return task;
};

const update = async ({
  id,
  title,
  order,
  description,
  userId,
  columnId
}) => {
  let updatedFields = {};
  if (title) {
    updatedFields = { ...updatedFields, title };
  }
  if (order) {
    updatedFields = { ...updatedFields, order };
  }
  if (description) {
    updatedFields = { ...updatedFields, description };
  }
  if (userId) {
    updatedFields = { ...updatedFields, userId };
  }
  if (columnId) {
    updatedFields = { ...updatedFields, columnId };
  }
  return Task.findOneAndUpdate(
      { _id: id },
      { ...updatedFields },
      { new: true }
  );
};

const deleteTask = async ({ taskId }) => {
  return (await Task.deleteOne({ _id: taskId })).deletedCount;
};

const findTask = async ({ id }) =>
  Task.findOne({ _id: id });

module.exports = { getTasksByColumnId, deleteTask, addTask, findTask, update };
