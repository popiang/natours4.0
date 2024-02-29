const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(bodyParser.json());

// 3rd party middleware
// display information of the api call
if (process.env.NODE_ENV === "development") {
	app.use(morgan('dev'));
}

// serve static files
app.use(express.static(`${__dirname}/public`));

// custom middleware - add request time to req.body
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
