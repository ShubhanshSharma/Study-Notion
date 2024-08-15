const mongoose = require('mongoose');

const ratingAndReviewsSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true,
        trim: true
    },
    raing:{
        type: String,
        required: true,
        enum: [1,2,3,4,5]
    },
    reviews:{
        type: String,
    }
});

module.exports = mongoose.model('RatingsAndReviews',ratingAndReviewsSchema);