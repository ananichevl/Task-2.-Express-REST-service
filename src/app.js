const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardsRouter = require('./resources/boards/boards.router');
const boardsv2Router = require('./resources/boardsv2/boardsv2.router');
const logger = require('./utils/logger');
const cors = require('cors');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(cors());

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardsRouter);
app.use('/boardsv2', boardsv2Router);

app.use((obj, req, res, next) => {
  if (obj.isSuccess) {
    return logger.log({
      level: 'info',
      message: obj.data
    });
  }
  next(obj);
});

app.use((err, req, res, next) => {
  if (err.isBoom) {
    logger.log({
      level: 'warn',
      message: { ...err.output.payload, ...err.data }
    });
    return res.status(err.output.payload.statusCode).json(err.output.payload);
  }
  res.status(500).json(err);
  logger.log({
    level: 'error',
    message: err
  });
  next();
});

module.exports = app;
