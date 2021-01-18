const Column = require('./columns.model');

const addColumn = async column => {
  await column.save();
  return column;
};

const getByBoardId = async boardId => {
  return Column.findOne({ boardId });
};

module.exports = {
  addColumn,
  getByBoardId
};
