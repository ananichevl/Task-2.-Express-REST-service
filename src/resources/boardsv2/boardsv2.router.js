const router = require('express').Router();
const boardsService = require('./boardsv2.service');
const handler = require('../../utils/handler');
const createSuccessObj = require('../../utils/success');
const authHandler = require('../../utils/authHandler');

router.route('/').get(
    authHandler,
  handler(async (req, res, next) => {
      const { id: userId } = req.user;
    const boards = await boardsService.getAll(userId);
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
    authHandler,
  handler(async (req, res, next) => {
      const { id: userId } = req.user;
    const { title } = req.body;
    const board = await boardsService.createBoard(title, userId);
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

router.route('/:id').put(
    authHandler,
    handler(async (req, res, next) => {
        const { id } = req.params;
        const { title, background } = req.body;
        const board = await boardsService.updateBoardById(id, title, background);
        res.json(board);
        next(
            createSuccessObj({
                statusCode: 200,
                url: '/boardsv2/',
                type: 'put',
                queryParams: req.params,
                body: req.body,
                result: board
            })
        );
    })
);

router.route('/:id').get(
    authHandler,
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

router.route('/:id').delete(
    authHandler,
  handler(async (req, res, next) => {
    const { id } = req.params;
    const result = await boardsService.removeById(id);
    res.json(result);
    next(
      createSuccessObj({
        statusCode: 200,
        url: '/boardsv2/:id',
        type: 'get',
        queryParams: req.params,
        body: req.body,
        result
      })
    );
  })
);

module.exports = router;
