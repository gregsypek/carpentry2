// const { router } = require('../app');
const Stair = require('../models/stairModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllStairs = catchAsync(async (req, res, next) => {
  const stairs = await Stair.find();
  res.status(200).json({
    status: 'success',
    results: stairs.length,
    data: {
      stairs,
    },
  });
});

exports.getStair = catchAsync(async (req, res, next) => {
  const stair = await Stair.findById(req.params.id);

  if (!stair) {
    return next(new AppError('Nie ma takiej usługi', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      stair,
    },
  });
});

exports.createStair = catchAsync(async (req, res, next) => {
  const newStair = await Stair.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      stair: newStair,
    },
  });
});

exports.updateStair = catchAsync(async (req, res, next) => {
  const stair = await Stair.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!stair) {
    return next(new AppError('Nie ma takiej usługi', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      stair,
    },
  });
});
exports.deleteStair = catchAsync(async (req, res, next) => {
  const stair = await Stair.findByIdAndDelete(req.params.id);
  if (!stair) {
    return next(new AppError('Nie ma takiej usługi', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
