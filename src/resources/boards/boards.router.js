const router = require('express').Router();
const boardsService = require('./boards.service');
const handler = require('../../utils/handler');
const createSuccessObj = require('../../utils/success');
const Board = require('./boards.model');

router.use('/', require('../tasks/tasks.router'));

router.route('/').get(
  handler(async (req, res, next) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(board => Board.toResponse(board)));
    next(
      createSuccessObj({
        statusCode: 200,
        url: '/boards/',
        type: 'get',
        queryParams: req.params,
        body: req.body,
        result: boards.map(board => Board.toResponse(board))
      })
    );
  })
);

router.route('/').post(
  handler(async (req, res, next) => {
    const { title, columns } = req.body;
    const board = await boardsService.createBoard(title, columns);
    res.json(Board.toResponse(board));
    next(
      createSuccessObj({
        statusCode: 200,
        url: '/boards/',
        type: 'post',
        queryParams: req.params,
        body: req.body,
        result: Board.toResponse(board)
      })
    );
  })
);

router.route('/:id').get(
  handler(async (req, res, next) => {
    const { id } = req.params;
    const board = await boardsService.getById(id);
    res.json(Board.toResponse(board));
    next(
      createSuccessObj({
        statusCode: 200,
        url: '/boards/:id',
        type: 'get',
        queryParams: req.params,
        body: req.body,
        result: Board.toResponse(board)
      })
    );
  })
);

router.route('/:id').put(
  handler(async (req, res, next) => {
    const { id } = req.params;
    const { title, columns } = req.body;
    const board = await boardsService.updateBoard(id, title, columns);
    res.json(Board.toResponse(board));
    next(
      createSuccessObj({
        statusCode: 200,
        url: '/boards/:id',
        type: 'put',
        queryParams: req.params,
        body: req.body,
        result: Board.toResponse(board)
      })
    );
  })
);

router.route('/:id').delete(
  handler(async (req, res, next) => {
    const { id } = req.params;
    await boardsService.deleteBoardById(id);
    res.status(204).end();
    next(
      createSuccessObj({
        statusCode: 200,
        url: '/boards/:id',
        type: 'delete',
        queryParams: req.params,
        body: req.body
      })
    );
  })
);

router.route('/:id/column').put(
  handler(async (req, res, next) => {
    const { id } = req.params;
    const { columnTitle } = req.body;
    const columnId = await boardsService.addColumn(id, columnTitle);
    res.json({ id: columnId });
    next(
      createSuccessObj({
        statusCode: 200,
        url: '/boards/:id/column',
        type: 'put',
        queryParams: req.params,
        body: req.body,
        result: { id: columnId }
      })
    );
  })
);

module.exports = router;
