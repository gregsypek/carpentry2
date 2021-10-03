const { promisify } = require('util'); // util is built in Node
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1 Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Proszę podać email oraz hasło', 400));
  }
  //2 Check if user exists && password is correct
  const user = await User.findOne({ email: email }).select('+password'); //include password as well

  //if user doesn't exist the right side will not run
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError(`Nieprawidłowy email lub hasło`, 401));
  }
  //3 If everything ok , send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  //1. Getting token and check of it's there

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // console.log(token);
  if (!token)
    return next(
      new AppError(
        'Nie jesteś zalogowany! Zaloguj się aby otrzymać dostęp',
        401
      )
    );
  //2. Verification token
  //  jwt.verify(token, secretOrPublicKey, [options, callback])
  // (Asynchronous) If a callback is supplied, function acts asynchronously. The callback is called with the decoded payload if the signature is valid and optional expiration, audience, or issuer are valid. If not, it will be called with the error.
  // (Synchronous) If a callback is not supplied, function acts synchronously. Returns the payload decoded if the signature is valid and optional expiration, audience, or issuer are valid. If not, it will throw the error.
  // token is the JsonWebToken string
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(decoded);
  //3. Check if user still exit;
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('Uzytkownik z tym tokenem juz nie istnieje', 401));
  }
  //4. Check if user changed password after the token was issued.
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        'Uzytkonwik ostatnio zmienił hasło. Proszę zaloguj się pononwnie',
        401
      )
    );
  }
  //GRANT ACCESS TO PROTECTED ROUTE
  // this request object,
  // this is the one that travels, basically,
  // from middleware to middleware.
  // And so, if we want to pass data
  // from one middleware to the next one,
  // then we can simply put some stuff on the request object,
  // and then that data will be available at a later point.
  req.user = currentUser;
  next();
});
exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    //roles ['admin']
    if (!roles.includes(req.user.role)) {
      return next(new AppError('Nie masz uprawnień', 403));
    }
    next();
  };
