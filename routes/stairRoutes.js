const express = require('express');

const stairController = require('../controllers/stairController');

const router = express.Router();

router.route('/').get(stairController.getAllStairs);

module.exports = router;
