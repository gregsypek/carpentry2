// const { router } = require('../app');
const Stair = require('../models/stairModel');

exports.getAllStairs = async (req, res) => {
  try {
    const stairs = await Stair.find();

    res.status(200).json({
      status: 'success',
      results: stairs.length,
      data: {
        stairs,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getStair = async (req, res) => {
  try {
    const stair = await Stair.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        stair,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
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
      message: err,
    });
  }
};

exports.updateStair = async (req, res) => {
  try {
    const stair = await Stair.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        stair,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Niewłaściwe dane',
    });
  }
};
exports.deleteStair = async (req, res) => {
  try {
    await Stair.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
