const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getHomePage);
router.get('/overview', viewController.getOverview);
router.get('/stairs/:slug', viewController.getStairs);

module.exports = router;
