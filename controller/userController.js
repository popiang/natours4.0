const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) {
            newObj[el] = obj[el];
        }
    });

    return newObj;
};

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

exports.updateMe = catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.confirmPassword) {
        return next(
            new AppError(
                'This route is not to update password. If you want to update password, go to route /updatePassword'
            )
        );
    }

    const filteredBody = filterObj(req.body, 'name', 'email');

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        filteredBody,
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        status: 'Success',
        data: {
            updatedUser,
        },
    });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: 'Success',
        data: null,
    });
});
