const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res) => {
    const tours = await User.find();

    res.status(200).json({
        status: 'Success',
        data: {
            tours,
        },
    });
});

exports.getAUser = (req, res) => {
    res.status(500).json({
        status: 'Error',
        message: 'This route is not ready yet',
    });
};

exports.createAUser = (req, res) => {
    res.status(500).json({
        status: 'Error',
        message: 'This route is not ready yet',
    });
};

exports.updateAUser = (req, res) => {
    res.status(500).json({
        status: 'Error',
        message: 'This route is not ready yet',
    });
};

exports.deleteAUser = (req, res) => {
    res.status(500).json({
        status: 'Error',
        message: 'This route is not ready yet',
    });
};
