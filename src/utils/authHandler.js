const boom = require('boom');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const usersRepo = require('../resources/users/user.db.repository');

const authHandler = (req, res, next) => {
    console.log('REQUEST');
    const { authorization } = req.headers;
    const token = authorization && authorization.split(' ')[1];
    if (!token) {
        throw boom.unauthorized();
    }
    jwt.verify(token, JWT_SECRET_KEY, async (err, user) => {
        if (err) {
            throw boom.forbidden();
        }
        const userRecord = await usersRepo.getById({ _id: user.id });
        if (!userRecord) {
            throw boom.forbidden();
        }
        req.user = user;
        next();
    });
};

module.exports = authHandler;
