const boom = require('boom');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

const authHandler = (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(' ')[1];
    if (!token) {
        throw boom.unauthorized();
    }
    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
        console.log(err);
        if (err) {
            throw boom.forbidden();
        }
        console.log(user);
        next();
    });
};

module.exports = authHandler;
