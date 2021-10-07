const express = require('express');
const priceController = require('../controllers/priceController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(priceController.getAllPrice)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    priceController.createPrice
  );

router
  .route('/:id')
  .patch(priceController.updatePrice)
  .delete(priceController.deletePrice);

module.exports = router;
