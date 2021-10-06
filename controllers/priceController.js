const Price = require('../models/priceModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllPrice = catchAsync(async (req, res, next) => {
  const allPrice = await Price.find();

  res.status(200).json({
    status: 'success',
    results: allPrice.lenght,
    data: {
      allPrice,
    },
  });
});
exports.createPrice = catchAsync(async (req, res, next) => {
  const newPrice = await Price.create(req.body);

  res.status(201).json({
    status: 'success',

    data: {
      newPrice,
    },
  });
});
