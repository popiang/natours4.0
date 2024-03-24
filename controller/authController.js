const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

const signToken = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    try {
        const user = await User.create(req.body);

        const token = signToken(user.id);

        res.status(200).json({
            status: 'Success',
            token,
            data: {
                user,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error,
        });
    }
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

	console.log(email, password);

    if (!email || !password) {
        return next(new AppError('Missing email or password', 400));
    }

	console.log('one');

    const user = await User.findOne({ email: email }).select('+password');

	console.log('two');

    if (!user || !(await user.correctPassword(password, user.password))) {
		console.log('masuk error');
        return next(new AppError('Incorrect email or password', 401));
    }

	console.log('three');

    const token = signToken(user._id);

	console.log('four');

    res.status(200).json({
        status: 'Success',
        token: token,
    });
});
