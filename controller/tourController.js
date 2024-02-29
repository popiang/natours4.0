// const fs = require('fs');
const Tour = require('../models/tourModel');

// get the tours from file
// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// param middleware
// validate tour ID
exports.checkID = (req, res, next, val) => {
    // convert the ID to integer
    const id = val * 1;

    // find the tour in tours array using the tour id
    // const tour = tours.find((el) => el.id === id);

    // send error message if tour is not found
    // if (!tour) {
    //     return res.status(400).json({
    //         status: 'Fail',
    //         message: 'Invalid tour ID',
    //     });
    // }

    // must call next function to flow of the process can continue
    next();
};

// validate req.body
exports.checkBody = (req, res, next) => {
    // check name and price in req.body
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'Fail',
            message: 'Tour name and price are compulsory',
        });
    }

    // proceed to flow of process
    next();
};

// get all tours
exports.getAllTours = async (req, res) => {
	try {
		const queryObj = { ...req.query };
		const excludedFields = ['page', 'sort', 'limit', 'fields'];
		const tours = await Tour.find(queryObj);

        res.status(200).json({
            status: 'Success',
            results: tours.length,
            data: {
                tours: tours,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error,
        });
    }
};

// get tour by tour id
exports.getATourById = async (req, res) => {
    const id = req.params.id;

    try {
        const tour = await Tour.findById(id);

        // send the response with the found tour
        res.status(200).json({
            status: 'Success',
            requestTime: req.requestTime,
            data: {
                tour: tour,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error,
        });
    }
};

// create a tour
exports.createATour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'Succes',
            data: {
                tour: newTour,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error,
        });
    }
};

// update a tour
exports.updateATour = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        // return a success update message
        res.status(200).json({
            status: 'Success',
            data: {
                tour: updatedTour,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error,
        });
    }
};

// delete a tour
exports.deleteATour = async (req, res) => {
    const id = req.params.id;

    try {
        await Tour.findByIdAndDelete(id);

        // return success delete messsage
        res.status(204).json({
            status: 'Success',
            message: 'Tour has been deleted',
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error,
        });
    }
};
