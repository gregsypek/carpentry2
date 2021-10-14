const express = require('express');
const priceController = require('../controllers/priceController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.use(authController.protect, authController.restrictTo('admin'));

router
  .route('/')
  .get(priceController.getAllPrice)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    priceController.createPrice
  );
router.use(authController.protect, authController.restrictTo('admin'));

router
  .route('/:id')
  .patch(
    priceController.uploadPriceImage,
    priceController.resizePriceImage,
    priceController.updatePrice
  )
  .delete(priceController.deletePrice);

module.exports = router;
