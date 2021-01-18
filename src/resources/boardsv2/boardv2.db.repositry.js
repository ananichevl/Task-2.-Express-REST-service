const Boardv2 = require('./boardsv2.model');

const getAll = async () => {
  return Boardv2.find({});
};

const addBoard = async board => {
  await board.save();
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

module.exports = {
  getAll,
  addBoard,
  getById
};
