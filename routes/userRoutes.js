const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// And so all of this is of course really secure,
// again because the ID of the user that is gonna be updated
// come from request.user,
// which was set by this protect middleware here,
// which in turn got the idea from the json web token,
// and since no one can change the ID in that json web token
// without knowing the secret
router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser);
// .delete(userController.deleteUser);

module.exports = router;
