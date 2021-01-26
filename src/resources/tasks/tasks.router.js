const router = require('express').Router();
const tasksService = require('./tasks.service');
const handler = require('../../utils/handler');
const createSuccessObj = require('../../utils/success');
const Task = require('./tasks.model');
const authHandler = require('../../utils/authHandler');

router.route('/:boardId/columns/:columnId/tasks').get(
    authHandler,
  handler(async (req, res, next) => {
    const { columnId } = req.params;
    const tasks = await tasksService.getTasksByBoardId(columnId);
    res.json(tasks.map(task => Task.toResponse(task)));
    next(
      createSuccessObj({
        statusCode: 200,
        url: '/:boardId/columns/:columnId/tasks',
        type: 'get',
        queryParams: req.params,
        body: req.body,
        result: tasks.map(task => Task.toResponse(task))
      })
    );
  })
);

router.route('/:boardId/columns/:columnId/tasks').post(
    authHandler,
  handler(async (req, res, next) => {
    const { columnId } = req.params;
    const {
      title,
      order,
      description,
      userId
    } = req.body;
    const task = await tasksService.addTask({
      title,
      order,
      description,
      userId,
      columnId
    });
    res.json(Task.toResponse(task));
    next(
      createSuccessObj({
        statusCode: 200,
        type: 'post',
        url: '/:boardId/columns/:columnId/tasks',
        queryParams: req.params,
        body: req.body,
        result: Task.toResponse(task)
      })
    );
  })
);

router.route('/:boardId/columns/:columnId/tasks/:taskId').get(
    authHandler,
  handler(async (req, res, next) => {
    const { taskId } = req.params;
    const task = await tasksService.findTask({ taskId });
    res.json(Task.toResponse(task));
    next(
      createSuccessObj({
        statusCode: 200,
        type: 'get',
        url: '/:boardId/columns/:columnId/tasks/:taskId',
        queryParams: req.params,
        body: req.body,
        result: Task.toResponse(task)
      })
    );
  })
);

router.route('/:boardId/columns/:columnId/tasks/:taskId').put(
    authHandler,
  handler(async (req, res, next) => {
    const { taskId, columnId } = req.params;
    const {
      title,
      order,
      description,
      userId,
      newColumnId
    } = req.body;
    const updatedTask = await tasksService.updateById({
      id: taskId,
      columnId,
      title,
      order,
      description,
      userId,
      newColumnId
    });
    res.json(Task.toResponse(updatedTask));
    next(
      createSuccessObj({
        statusCode: 200,
        type: 'put',
        url: '/:boardId/columns/:columnId/tasks/:taskId',
        queryParams: req.params,
        body: req.body,
        result: Task.toResponse(updatedTask)
      })
    );
  })
);

router.route('/:boardId/columns/:columnId/tasks/:taskId').delete(
    authHandler,
  handler(async (req, res, next) => {
    const { taskId, columnId } = req.params;
    await tasksService.deleteTask({ taskId, columnId });
    res.status(204).end();
    next(
      createSuccessObj({
        statusCode: 204,
        type: 'delete',
        url: '/:boardId/columns/:columnId/tasks/:taskId',
        queryParams: req.params,
        body: req.body
      })
    );
  })
);

module.exports = router;
