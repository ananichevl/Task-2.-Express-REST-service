const router = require('express').Router();
const columnService = require('./columns.service');
const handler = require('../../utils/handler');
const createSuccessObj = require('../../utils/success');
const authHandler = require('../../utils/authHandler');

router.route('/:boardId/columns').post(
    authHandler,
  handler(async (req, res, next) => {
    const { boardId } = req.params;
    const { title, order } = req.body;
    const column = await columnService.createColumn(title, order, boardId);
    res.json(column);
    next(
      createSuccessObj({
        statusCode: 200,
        url: '/:boardId/columns',
        type: 'post',
        queryParams: req.params,
        body: req.body,
        result: { column }
      })
    );
  })
);

router.route('/:boardId/columns/:columnId').get(
    authHandler,
    handler(async (req, res, next) => {
        const { columnId } = req.params;
        const column = await columnService.getColumnById(columnId);
        res.json(column);
        next(
            createSuccessObj({
                statusCode: 200,
                url: '/:boardId/columns/:columnId',
                type: 'get',
                queryParams: req.params,
                body: req.body,
                result: { column }
            })
        );
    })
);

router.route('/:boardId/columns/:columnId').put(
    authHandler,
    handler(async (req, res, next) => {
        const { boardId, columnId } = req.params;
        const { title, order } = req.body;
        const column = await columnService.updateColumn(boardId, columnId, title, order);
        res.json(column);
        next(
            createSuccessObj({
                statusCode: 200,
                url: '/:boardId/columns/:columnId',
                type: 'put',
                queryParams: req.params,
                body: req.body,
                result: { column }
            })
        );
    })
);

router.route('/:boardId/columns/:columnId').delete(
    authHandler,
    handler(async (req, res, next) => {
        const { boardId, columnId } = req.params;
        const column = await columnService.deleteColumn(boardId, columnId);
        res.status(204).end();
        next(
            createSuccessObj({
                statusCode: 200,
                url: '/:boardId/columns/:columnId',
                type: 'delete',
                queryParams: req.params,
                body: req.body,
                result: { column }
            })
        );
    })
);

module.exports = router;
