const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const stairRouter = require('./routes/stairRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//GLOBAL  MIDDLEWARES
// Set security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//Limit requests from the same API
const limiter = rateLimit({
  max: 100, //to prevent denial of service and also brute force attacks
  windowMs: 60 * 60 * 100,
  message:
    'Za duzo zapytań od tego adresu IP, Proszę spróbować później po upływie godziny',
});
app.use('/api', limiter);

//Body parser, reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());
//Data sanitization against XSS
app.use(xss());

//Prevent parameter pollution( two the same fields in query are
// converted into array - split(',') doesnt work in sort function )
app.use(hpp());
//Serving static files
app.use(express.static(`${__dirname}/public`));

//Test middleware
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
