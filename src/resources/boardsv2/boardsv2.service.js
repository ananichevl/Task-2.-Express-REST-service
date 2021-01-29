const boom = require('boom');
const boardsv2Repo = require('./boardv2.db.repositry');
const Boardv2 = require('./boardsv2.model');
const { newBoard, updateBoard } = require('./boardsv2.schema');

const getAll = async (userId) => await boardsv2Repo.getAll(userId);

const createBoard = (title, userId) => {
  const { error } = newBoard.validate({ title });
  if (error) throw boom.badRequest(error.message, { request: 'createBoard' });
  const board = new Boardv2({ title, userId });
  return boardsv2Repo.addBoard(board);
};

const getById = async id => {
  const board = await boardsv2Repo.getById(id);
  if (!board) {
    throw boom.notFound("This board doesn't exist", {
      request: 'getByIdBoard'
    });
  }
  return board;
};

const removeById = async id => {
  const board = await boardsv2Repo.removeById(id);
  if (!board) {
    throw boom.notFound("This board doesn't exist", {
      request: 'removeById'
    });
  }
  return board;
};

const updateBoardById = async (id, title) => {
  const { error } = updateBoard.validate({ title });
  if (error) throw boom.badRequest(error.message, { request: 'updateBoard' });

  return boardsv2Repo.update(id, title);
};

module.exports = {
  getAll,
  createBoard,
  getById,
  removeById,
  updateBoardById
};
