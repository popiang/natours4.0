const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);

router
    .route('/')
    .get(userController.getAllUsers);

// router
//     .route('/:id')
//     .get(userController.getAUser)
//     .patch(userController.updateAUser)
//     .delete(userController.deleteAUser);

module.exports = router;
