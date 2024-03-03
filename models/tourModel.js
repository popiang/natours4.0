const mongoose = require('mongoose');
const slugify = require('slugify');

// create tour schema
const tourSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A tour must has a name'],
            unique: true,
            trim: true,
			maxlength: [40, 'A tour name must have less or equal then 40 characters'],
			minlength: [10, 'A tour name must have more or equal than 10 characters']
        },
        slug: String,
        duration: {
            type: Number,
            required: [true, 'A tour must have a duration'],
        },
        maxGroupSize: {
            type: Number,
            required: [true, 'A tour must have a group size'],
        },
        difficulty: {
            type: String,
            required: [true, 'A tour must have a difficulty'],
			enum: {
				values: ['easy', 'medium', 'difficult'],
				message: 'Difficulty has to be easy, medium or difficult'
			}
        },
        ratingsAverage: {
            type: Number,
            default: 4.5,
			min: [1, 'Rating must be equal or above 1.0'],
			max: [5, 'Rating must be equal or below 5.0']
        },
        ratingsQuantity: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            required: [true, 'A tour must has a price'],
        },
        priceDiscount: {
			type: Number,
			validate: {
				validator: function(val) {
					return val < this.price;
				},
				message: 'Discount price ({PRICE}) must be below the regular price'
			}
		},
        summary: {
            type: String,
            trim: true,
            required: [true, 'A tour must have a summary'],
        },
        description: {
            type: String,
            trim: true,
        },
        imageCover: {
            type: String,
            required: [true, 'A tour must have an image cover'],
        },
        images: [String],
        createdAt: {
            type: Date,
            default: Date.now(),
			select: false
        },
        startDates: [Date],
        secretTour: {
            type: Boolean,
            default: false,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// virtual properties
tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7;
});

// document middleware
tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// query middleware
tourSchema.pre(/^find/, function (next) {
    this.start = Date.now();
    next();
});

tourSchema.post(/^find/, function (docs, next) {
    console.log(`Query took ${Date.now() - this.start} milliseconds`);
    next();
});

// aggregation middleware - works only on aggregation
tourSchema.pre('aggregate', function (next) {
	// it filter out secret tour from the result
    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
    console.log(this.pipeline());
    next();
});

// use the tour schema to create tour model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
