// const { router } = require('../app');
const Stair = require('../models/stairModel');
// const AppError = require('../utils/appError');
// const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllStairs = factory.getAll(Stair);

exports.getStair = factory.getOne(Stair);

exports.createStair = factory.createOne(Stair);

exports.updateStair = factory.updateOne(Stair);

exports.deleteStair = factory.deleteOne(Stair);
