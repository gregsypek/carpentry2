// const { router } = require('../app');
const Stair = require('../models/stairModel');

exports.getAllStairs = (req, res) => {
  res.send('<h1>hello</h1>');
};

exports.createStair = async (req, res) => {
  try {
    const newStair = await Stair.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        stair: newStair,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Niewłaściwe dane',
    });
  }
};
