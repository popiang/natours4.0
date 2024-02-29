const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require("../../models/tourModel");

dotenv.config({ path: '../../config.env' });

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
    console.log('Database successfully connected!');
});

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

const importData = async () => {
	try {
		await Tour.create(tours);
	} catch (error) {
		console.log(error);
	}
	process.exit();
}	

const deleteData = async () => {
	try {
		await Tour.deleteMany();
	} catch (error) {
		console.log(error);
	}
	process.exit();
}

if (process.argv[2] === "--import") {
	importData();
} else if (process.argv[2] === "--delete") {
	deleteData();
}