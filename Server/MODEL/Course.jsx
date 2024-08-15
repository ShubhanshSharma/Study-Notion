const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName:{
        type: String,
        required: true,
        trim: true
    },
    courseDescription:{
        type: String,
        required: true,
        trim: true
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    whatWillYouLearn:{
        type: String,
        required: true,
    },
    courseContent:[
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Section'
        }
    ],
    price:{
        type: Number,
        required: true,
    },
    ratingAndReviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RatingsAndReviews'
        }
    ],
    thumbnail:{
        type: String,
        required: true,
    },
    tags:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag'
        }
    ],
    studentEnrolled:[
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
    ]
});

module.exports = mongoose.model('Course',courseSchema);