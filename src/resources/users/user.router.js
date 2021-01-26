const router = require('express').Router();
const usersService = require('./user.service');
const handler = require('../../utils/handler');
const authHandler = require('../../utils/authHandler');
const createSuccessObj = require('../../utils/success');
const User = require('./user.model');

router.route('/').get(
  authHandler,
  handler(async (req, res, next) => {
    const users = await usersService.getAll();
    res.json(users.map(user => User.toResponse(user)));
    next(
      createSuccessObj({
        statusCode: 200,
        url: '/users',
        type: 'get',
        queryParams: req.params,
        body: req.body,
        result: users.map(user => User.toResponse(user))
      })
    );
  })
);

router.route('/').post(
  handler(async (req, res, next) => {
    const { login, password } = req.body;
    const user = await usersService.addUser(login, password);
    res.json(User.toResponse(user));
    next(
      createSuccessObj({
        statusCode: 200,
        url: '/users',
        type: 'post',
        queryParams: req.params,
        body: req.body,
        result: User.toResponse(user)
      })
    );
  })
);

router.route('/login').post(
    handler(async (req, res, next) => {
        const { login, password } = req.body;
        const user = await usersService.loginUser(login, password);
        res.json(User.toResponse(user));
        next(
            createSuccessObj({
                statusCode: 200,
                url: '/users/login',
                type: 'post',
                queryParams: req.params,
                body: req.body,
                result: User.toResponse(user)
            })
        );
    })
);

router.route('/:id').get(
    authHandler,
  handler(async (req, res, next) => {
    const user = await usersService.getById(req.params.id);
    res.json(User.toResponse(user));
    next(
      createSuccessObj({
        statusCode: 200,
        url: '/users/:id',
        type: 'get',
        queryParams: req.params,
        body: req.body,
        result: User.toResponse(user)
      })
    );
  })
);

router.route('/:id').put(
    authHandler,
  handler(async (req, res, next) => {
    const { name, login, password } = req.body;
    const updatedUser = await usersService.updateUser(
      name,
      login,
      password,
      req.params.id
    );
    res.json(User.toResponse(updatedUser));
    next(
      createSuccessObj({
        statusCode: 200,
        url: '/users/:id',
        type: 'put',
        queryParams: req.params,
        body: req.body,
        result: User.toResponse(updatedUser)
      })
    );
  })
);

router.route('/:id').delete(
    authHandler,
  handler(async (req, res, next) => {
    await usersService.getById(req.params.id);
    await usersService.deleteById(req.params.id);
    res.status(204).end();
    next(
      createSuccessObj({
        statusCode: 200,
        url: '/users/:id',
        type: 'delete',
        queryParams: req.params,
        body: req.body
      })
    );
  })
);

module.exports = router;
