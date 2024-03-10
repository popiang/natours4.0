1. create package.json files
	- npm init
2. npm install
	- express
	- body-parser
	- morgan
	- dotenv
	- mongoose
	- slugify
3. create
	- app.js
	- server.js
	- config.env
	- folder: routes
		- tourRoutes.js
		- userRoutes.js
	- folder: controller
		- tourController.js
		- userController.js
		- errorController.js
	- folder: models
		- tourModel.js
	- folder: utils
4. app.js
	- require express
	- require body-parser
	- require morgan
	- create app
	- use bodyparser
	- set static files
5. create db in mongo db atlas
6. in tourModel.js create 
	- tourSchema with all the validations
7. in tourController create
	- getAllTours
	- getTourById
	- createTour
	- updateTour
	- deleteTour
8. in tourRoutes create routes for all above controller
9. import dev data into db
10. test semuanya kat postman
11. if semua ok, then add query, limit fields, sort & paginate features into tourController and move the features to apiFeatures.js
12. if semua ok, then dalam tourModel
	- create virtual properties
	- add document middleware
	- add query middleware
	- add aggregation middleware
13. create getTourStats & getMonthlyPlan using Tour.aggregate
14. handle errors
	- create catchAsync
	- create appError
	- handle the rest of the error



	
