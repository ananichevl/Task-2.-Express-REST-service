const boom = require('boom');
const Column = require('./columns.model');
const columnRepo = require('./column.db.repository');
const { addColumnScheme } = require('./columns.schema');

const createColumn = (title, boardId) => {
  const { error } = addColumnScheme.validate({ title, boardId });
  if (error) throw boom.badRequest(error.message, { request: 'createColumn' });
  const column = new Column({ title, boardId });
  return columnRepo.addColumn(column);
};

module.exports = {
  createColumn
};
