const router = require('express').Router();
const columnService = require('./columns.service');
const handler = require('../../utils/handler');
const createSuccessObj = require('../../utils/success');

router.route('/:boardId/column-v2').post(
  handler(async (req, res, next) => {
    const { boardId } = req.params;
    const { title } = req.body;
    const column = await columnService.createColumn(title, boardId);
    res.json({ id: column._id });
    next(
      createSuccessObj({
        statusCode: 200,
        url: '/:boardId/column-v2',
        type: 'post',
        queryParams: req.params,
        body: req.body,
        result: { id: column._id }
      })
    );
  })
);

module.exports = router;
