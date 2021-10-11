const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewController.getHomePage);
router.get('/overview', viewController.getOverview);
router.get('/stairs/:slug', viewController.getStairs);
router.get('/price', viewController.getPrice);
router.get('/contact', viewController.getContact);
router.get('/login', viewController.getLoginForm);

module.exports = router;
