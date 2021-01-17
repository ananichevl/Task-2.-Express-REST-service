const Board = require('./boards.model');
const Task = require('../tasks/tasks.model');

const getAll = async () => {
  return Board.find({});
};

const addBoard = async board => {
  await board.save();
  return board;
};

const getById = async id => {
  return Board.findOne({ _id: id });
};

const update = async ({ title, newColumns, id }) => {
  return Board.updateOne({ _id: id }, { title, columns: newColumns });
};

const deleteBoardById = async id => {
  await Task.deleteMany({ boardId: id });
  return (await Board.deleteOne({ _id: id })).deletedCount;
};

const addColumn = async ({ id, newColumn }) => {
  const board = await getById(id);
  const updatedBoard = await Board.findByIdAndUpdate(
    { _id: id },
    { title: board.title, columns: [...board.columns, newColumn] },
    { new: true }
  );
  return updatedBoard.columns.find(c => c.title === newColumn.title).id;
};

module.exports = {
  getAll,
  addBoard,
  getById,
  deleteBoardById,
  update,
  addColumn
};
