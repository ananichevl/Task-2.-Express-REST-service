const router = require('express').Router();
const boardsService = require('./boardsv2.service');
const handler = require('../../utils/handler');
const createSuccessObj = require('../../utils/success');

router.route('/').get(
  handler(async (req, res, next) => {
    const boards = await boardsService.getAll();
    res.json(boards);
    next(
      createSuccessObj({
        statusCode: 200,
        url: '/boardsv2/',
        type: 'get',
        queryParams: req.params,
        body: req.body,
        result: boards
      })
    );
  })
);

router.route('/').post(
  handler(async (req, res, next) => {
    const { title, columns } = req.body;
    const board = await boardsService.createBoard(title, columns);
    res.json(board);
    next(
      createSuccessObj({
        statusCode: 200,
        url: '/boardsv2/',
        type: 'post',
        queryParams: req.params,
        body: req.body,
        result: board
      })
    );
  })
);

router.route('/:id').get(
  handler(async (req, res, next) => {
    const { id } = req.params;
    const board = await boardsService.getById(id);
    res.json(board);
    next(
      createSuccessObj({
        statusCode: 200,
        url: '/boardsv2/:id',
        type: 'get',
        queryParams: req.params,
        body: req.body,
        result: board
      })
    );
  })
);

module.exports = router;
