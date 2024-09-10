const mongoose = require('mongoose');

const ratingAndReviewsSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'user'
    },
    raing:{
        type: Number,
        required: true,
        enum: [1,2,3,4,5]
    },
    review:{
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'course',
        index: true
    }
});

module.exports = mongoose.model('RatingsAndReviews',ratingAndReviewsSchema);