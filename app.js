const express = require('express');
const morgan = require('morgan');

const stairRouter = require('./routes/stairRoutes');

const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use('api/v1/stairs', stairRouter);

module.exports = app;
