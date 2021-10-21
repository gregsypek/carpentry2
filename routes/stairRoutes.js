const express = require('express');
const authController = require('../controllers/authController');
const stairController = require('../controllers/stairController');

const router = express.Router();

router
  .route('/')
  .get(stairController.getAllStairs)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    stairController.uploadStairImages,
    stairController.resizeStairImages,
    stairController.createStair
  );

router
  .route('/:id')
  .get(stairController.getStair)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    stairController.uploadNewPhotos,
    stairController.resizeNewPhotos,
    stairController.updateStair
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    stairController.deleteStair
  );

module.exports = router;
