const boom = require('boom');
const boardsv2Repo = require('./boardv2.db.repositry');
const Boardv2 = require('./boardsv2.model');
const { newBoard } = require('./boardsv2.schema');

const getAll = async () => await boardsv2Repo.getAll();

const createBoard = title => {
  const { error } = newBoard.validate({ title });
  if (error) throw boom.badRequest(error.message, { request: 'createBoard' });
  const board = new Boardv2({ title });
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

module.exports = {
  getAll,
  createBoard,
  getById,
  removeById
};
