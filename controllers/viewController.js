const Stair = require('../models/stairModel');
const Price = require('../models/priceModel');
const catchAsync = require('../utils/catchAsync');

exports.getHomePage = (req, res) => {
  res.status(200).render('home', {
    title: 'Schody Zaliński',
  });
};

exports.getOverview = catchAsync(async (req, res, next) => {
  //1 Get stair data from collection
  const stairs = await Stair.find();
  //2 Build template

  //3 Render that template using stair data from 1

  res.status(200).render('overview', {
    title: 'Nasza oferta',
    stairs,
  });
});
exports.getStairs = catchAsync(async (req, res) => {
  const stairs = await Stair.findOne({ slug: req.params.slug });

  res.status(200).render('stairs', {
    title: 'Schody',
    stairs,
  });
});
exports.getPrice = catchAsync(async (req, res) => {
  const price = await Price.find();

  res.status(200).render('price', {
    title: 'Cennik',
    price,
  });
});
exports.getContact = catchAsync(async (req, res) => {
  res.status(200).render('contact', {
    title: 'Kontakt',
  });
});
