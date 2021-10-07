const Price = require('../models/priceModel');
// const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllPrice = factory.getAll(Price);
exports.createPrice = factory.createOne(Price);

//Don't update passwords with this
exports.updatePrice = factory.updateOne(Price);
exports.deletePrice = factory.deleteOne(Price);
