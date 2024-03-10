const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

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

// alias - create query to get top 5 tours
exports.aliasTop5Tours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
};

// get all tours
exports.getAllTours = catchAsync(async (req, res) => {
    // execute the query
    const features = new APIFeatures(Tour.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const tours = await features.query;

    res.status(200).json({
        status: 'Success',
        results: tours.length,
        data: {
            tours: tours,
        },
    });
});

// get tour by tour id
exports.getATourById = catchAsync(async (req, res, next) => {
    const id = req.params.id;

    const tour = await Tour.findById(id);

	if (!tour) {
		return next(new AppError('Tour with the ID is not found', 404));
	}

    // send the response with the found tour
    res.status(200).json({
        status: 'Success',
        requestTime: req.requestTime,
        data: {
            tour: tour,
        },
    });
});

// create a tour
exports.createATour = catchAsync(async (req, res) => {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
        status: 'Succes',
        data: {
            tour: newTour,
        },
    });
});

// update a tour
exports.updateATour = catchAsync(async (req, res, next) => {
    const id = req.params.id;

    const updatedTour = await Tour.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });

	if (!updatedTour) {
		return next(new AppError('Tour with the ID is not found', 404));
	}

    // return a success update message
    res.status(200).json({
        status: 'Success',
        data: {
            tour: updatedTour,
        },
    });
});

// delete a tour
exports.deleteATour = catchAsync(async (req, res, next) => {
    const id = req.params.id;

    const deletedTour = await Tour.findByIdAndDelete(id);

	if (!deletedTour) {
		return next(new AppError('Tour with the ID is not found', 404));
	}

    // return success delete messsage
    res.status(204).json({
        status: 'Success',
        message: 'Tour has been deleted',
    });
});

exports.getTourStats = catchAsync(async (req, res) => {
    const stats = await Tour.aggregate([
        {
            // filter tours by ratingAverage
            $match: { ratingsAverage: { $gte: 4.5 } },
        },
        {
            // results of above filters are grouped
            $group: {
                _id: { $toUpper: '$difficulty' },
                numTours: { $sum: 1 },
                numRatings: { $sum: '$ratingsQuantity' },
                avgRating: { $avg: '$ratingsAverage' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' },
            },
        },
        {
            // sort by averagePrice
            $sort: { avgPrice: 1 },
        },
    ]);

    res.status(200).json({
        status: 'Success',
        data: {
            stats,
        },
    });
});

exports.getMonthlyPlan = catchAsync(async (req, res) => {
    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
        {
            $unwind: '$startDates',
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                },
            },
        },
        {
            $group: {
                _id: { $month: '$startDates' },
                numTourStarts: { $sum: 1 },
                tours: { $push: `$name` },
            },
        },
        {
            $addFields: { month: `$_id` },
        },
        {
            // hide _id from the result
            $project: { _id: 0 },
        },
        {
            $sort: { numTourStarts: -1 },
        },
        {
            $limit: 12,
        },
    ]);

    res.status(200).json({
        status: 'Success',
        data: {
            plan,
        },
    });
});
