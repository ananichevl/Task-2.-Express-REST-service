const boom = require('boom');
const Column = require('./columns.model');
const columnRepo = require('./column.db.repository');
const { addColumnScheme, updateColumnScheme, deleteColumnScheme, getColumnScheme } = require('./columns.schema');

const createColumn = (title, order, boardId) => {
  const { error } = addColumnScheme.validate({ title, order, boardId });
  if (error) throw boom.badRequest(error.message, { request: 'createColumn' });
  const column = new Column({ title, order, boardId });
  return columnRepo.addColumn(column);
};

const getColumnById = (columnId) => {
  const { error } = getColumnScheme.validate({ columnId });
  if (error) throw boom.badRequest(error.message, { request: 'getColumnById' });
  return columnRepo.getByColumnId(columnId);
};

const updateColumn = async (boardId, columnId, title, order) => {
  const { error } = updateColumnScheme.validate({ boardId, columnId, title, order });
  if (error) throw boom.badRequest(error.message, { request: 'updateColumn' });

  if (order !== undefined) {
    const columns = await columnRepo.getByBoardId(boardId);
    const result = await reorderColumns(columns, columnId, order);
    return result[order];
  }

  return columnRepo.update(columnId, title, order);
};

const deleteColumn = async (boardId, columnId) => {
  const { error } = deleteColumnScheme.validate({ boardId, columnId });
  if (error) throw boom.badRequest(error.message, { request: 'deleteColumn' });

  const result = await columnRepo.deleteColumn({ columnId });
  const columns = await columnRepo.getByBoardId(boardId);
  const reorderResult = await reorderBoard(columns);
  console.log(reorderResult);
  return result;
};

const reorderColumns = async (columns, id, order) => {
  const [removed] = columns.splice(columns.findIndex((item) => item._id === id), 1);
  columns.splice(order, 0, removed);

  return reorderBoard(columns);
};

const reorderBoard = async (columns) => {
  const updatedColumns = columns.map((item, index) => {
    item.order = index;
    return item;
  });

  const updatedColumnsPromises = updatedColumns.map((item) => {
    return new Promise((resolve, reject) => {
      item.save((errorRes, result) => {
        if (errorRes) {
          reject(errorRes);
        }
        resolve(result);
      });
    });
  });

  return Promise.all(updatedColumnsPromises);
};

module.exports = {
  createColumn,
  updateColumn,
  deleteColumn,
  getColumnById
};
