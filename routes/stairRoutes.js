const express = require('express');

const stairController = require('../controllers/stairController');

const router = express.Router();

router
  .route('/')
  .get(stairController.getAllStairs)
  .post(stairController.createStair);

router
  .route('/:id')
  .get(stairController.getStair)
  .patch(stairController.updateStair)
  .delete(stairController.deleteStair);

module.exports = router;
