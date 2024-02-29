const mongoose = require('mongoose');
const dotenv = require('dotenv');

// call the config.env file
dotenv.config({ path: './config.env' });

const app = require('./app');

// set the db connection string
const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);

console.log(DB);

// connect to the database
mongoose.connect(DB).then(() => console.log(`DB connection successfull`));

// START THE SERVER
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
