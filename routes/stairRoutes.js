const express = require('express');
const authController = require('../controllers/authController');
const stairController = require('../controllers/stairController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, stairController.getAllStairs)
  .post(stairController.createStair);

router
  .route('/:id')
  .get(stairController.getStair)
  .patch(stairController.updateStair)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    stairController.deleteStair
  );

module.exports = router;
