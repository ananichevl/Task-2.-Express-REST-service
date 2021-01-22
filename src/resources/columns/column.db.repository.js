const Column = require('./columns.model');

const addColumn = async column => {
    await column.save();
    return column;
};

const getByBoardId = async boardId => {
    return Column.find({ boardId }, null, { sort: { order: 1 } });
};

const getByColumnId = async columnId => {
    return Column.findOne({ _id: columnId }).populate({
        path: 'tasks',
        select: 'title description order',
        options: { sort: { order: 1 } }
    });
};

const update = async (columnId, title, order) => {
  let updatedFields = {};
  if (title) {
    updatedFields = { ...updatedFields, title };
  }
  if (order) {
    updatedFields = { ...updatedFields, order };
  }
  return Column.findOneAndUpdate(
      { _id: columnId },
      { ...updatedFields },
      { new: true }
  );
};

const deleteColumn = async ({ columnId }) => {
    return (await Column.remove({ _id: columnId })).deletedCount;
};

module.exports = {
    addColumn,
    getByBoardId,
    update,
    deleteColumn,
    getByColumnId
};
