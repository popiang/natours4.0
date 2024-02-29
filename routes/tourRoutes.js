const express = require('express');
const tourController = require('../controller/tourController');
const router = express.Router();

// param middleware - to validate tour ID
router.param("id", tourController.checkID);

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkBody, tourController.createATour);
router
    .route('/:id')
    .get(tourController.getATourById)
    .patch(tourController.updateATour)
    .delete(tourController.deleteATour);

module.exports = router;
