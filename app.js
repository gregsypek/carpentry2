const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const stairRouter = require('./routes/stairRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//GLOBAL  MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
const limiter = rateLimit({
  max: 100, //to prevent denial of service and also brute force attacks
  windowMs: 60 * 60 * 100,
  message:
    'Za duzo zapytań od tego adresu IP, Proszę spróbować później po upływie godziny',
});
app.use('/api', limiter);

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  // req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// ROUTES
app.use('/api/v1/stairs', stairRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Nie mozna odnaleźć ${req.originalUrl} na tym serwerze!`));
});

app.use(globalErrorHandler);

module.exports = app;
