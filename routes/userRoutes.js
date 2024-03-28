const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);

router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').patch(authController.resetPassword);
router
    .route('/updatePassword')
    .patch(authController.protect, authController.updatePassword);

router.route('/').get(userController.getAllUsers);
router.route('/updateMe').patch(authController.protect, userController.updateMe);
router.route('/deleteMe').delete(authController.protect, userController.deleteMe);

// router
//     .route('/:id')
//     .get(userController.getAUser)
//     .patch(userController.updateAUser)
//     .delete(userController.deleteAUser);

module.exports = router;
