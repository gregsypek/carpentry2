// const { router } = require('../app');
const Stair = require('../models/stairModel');

exports.getAllStairs = (req, res) => {
  res.send('<h1>hello</h1>');
};

exports.createStair = (req, res) => {
  res.status(201).json({
    status: 'success',
  });
};
