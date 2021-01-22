const boom = require('boom');
const tasksRepo = require('./tasks.db.repository');
const Task = require('./tasks.model');
const { taskCreate, taskUpdate } = require('./tasks.schema');

const getTasksByColumnId = async boardId =>
  await tasksRepo.getTasksByColumnId(boardId);

const addTask = async ({
  title,
  order,
  description,
  userId,
  columnId
}) => {
  const { error } = taskCreate.validate({
    title,
    order,
    description,
    userId,
    columnId
  });
  if (error) {
    throw boom.badRequest(error.message, {
      request: 'addTask'
    });
  }
  const newTask = new Task({
    title,
    order,
    description,
    userId,
    columnId
  });
  return await tasksRepo.addTask(newTask);
};

const updateById = async ({
  id,
  columnId,
  title,
  order,
  description,
  userId,
  newColumnId
}) => {
  const { error } = taskUpdate.validate({
    id,
    title,
    order,
    description,
    userId,
    columnId,
    newColumnId
  });
  if (error) {
    throw boom.badRequest(error.message, {
      request: 'updateByIdTask'
    });
  }

  if (newColumnId && order !== undefined) {
    const task = await tasksRepo.update({ id, columnId: newColumnId });
    const tasksOldColumn = await tasksRepo.getTasksByColumnId(columnId);
    const resultOldColumn = await reorderColumn(tasksOldColumn);
    if (!resultOldColumn) {
      throw boom.serverUnavailable('cannot update old column', { task });
    }
    const tasksNewColumn = await tasksRepo.getTasksByColumnId(newColumnId);
    const result = await reorderTasks(tasksNewColumn, id, order);
    return result[order];
  }

  if (order !== undefined) {
    const tasks = await tasksRepo.getTasksByColumnId(columnId);
    const result = await reorderTasks(tasks, id, order);
    return result[order];
  }

  return await tasksRepo.update({
    id,
    title,
    order,
    description,
    userId,
    columnId
  });
};

const deleteTask = async ({ taskId, columnId }) => {
  const ok = await tasksRepo.deleteTask({ taskId });
  if (!ok) {
    throw boom.notFound("This task doesn't exist", { request: 'deleteTask' });
  }
  const tasks = await tasksRepo.getTasksByColumnId(columnId);
  const reorderResult = await reorderColumn(tasks);
  console.log(reorderResult);
  return ok;
};

const findTask = async ({ taskId }) => {
  const existedTask = await tasksRepo.findTask({ id: taskId });
  if (!existedTask) {
    throw boom.notFound("This task doesn't exist", { request: 'findTask' });
  }
  return existedTask;
};

const reorderTasks = async (tasks, id, order) => {
  const [removed] = tasks.splice(tasks.findIndex((item) => item._id === id), 1);
  tasks.splice(order, 0, removed);

  return reorderColumn(tasks);
};

const reorderColumn = async (tasks) => {
  const updatedTasks = tasks.map((item, index) => {
    item.order = index;
    return item;
  });

  const updatedTasksPromises = updatedTasks.map((item) => {
    return new Promise((resolve, reject) => {
      item.save((errorRes, result) => {
        if (errorRes) {
          reject(errorRes);
        }
        resolve(result);
      });
    });
  });

  return Promise.all(updatedTasksPromises);
};

module.exports = {
  getTasksByColumnId,
  addTask,
  updateById,
  deleteTask,
  findTask
};
