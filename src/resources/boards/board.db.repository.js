const Board = require('./boards.model');
const Boardv2 = require('../boardsv2/boardsv2.model');
const Task = require('../tasks/tasks.model');

const getAll = async () => {
  return Board.find({});
};

const addBoard = async board => {
  await board.save();
  const titlev2 = board.title;
  const boarv2 = new Boardv2({ titlev2 });
  await boarv2.save();
  return board;
};

const getById = async id => {
  return Boardv2.findOne({ _id: id }).populate({
    path: 'columns',
    select: 'title',
    populate: {
      path: 'tasks',
      select: 'title'
    }
  });
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
