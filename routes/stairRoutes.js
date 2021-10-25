const express = require('express');
const authController = require('../controllers/authController');
const stairController = require('../controllers/stairController');
const uploadController = require('../controllers/uploadController');

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
    uploadController.uploadImages,
    uploadController.resizeImages,
    uploadController.updateImages
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    stairController.deleteStair
  );

// router.post(
//   '/addPhoto',
//   uploadController.uploadImages,
//   uploadController.resizeImages
// );

module.exports = router;
