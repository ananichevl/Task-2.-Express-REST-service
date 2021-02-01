const Boardv2 = require('./boardsv2.model');

const getAll = async (userId) => {
  return Boardv2.find({ userId });
};

const addBoard = async board => {
  await board.save();
  return board;
};

const getById = async id => {
  return Boardv2.findOne({ _id: id }).populate({
    path: 'columns',
    select: 'title order',
    options: { sort: { order: 1 } },
    populate: {
      path: 'tasks',
      select: 'title description order',
      options: { sort: { order: 1 } }
    }
  });
};

const removeById = async id => {
  return Boardv2.remove({ _id: id });
};

const update = async (id, title, background) => {
  let updatedFields = {};
  if (title) {
    updatedFields = { ...updatedFields, title };
  }
  if (background) {
    updatedFields = { ...updatedFields, background };
  }
  return Boardv2.findOneAndUpdate(
      { _id: id },
      { ...updatedFields },
      { new: true });
};

module.exports = {
  getAll,
  addBoard,
  getById,
  removeById,
  update
};
