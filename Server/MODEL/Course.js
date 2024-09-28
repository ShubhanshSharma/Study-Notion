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
        ref: 'user'
    },
    whatWillYouLearn:{
        type: String,
        required: true,
    },
    courseContent:[
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'section'
        }
    ],
    price:{
        type: Number,
        required: true,
    },
    ratingAndReviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ratingsAndReviews'
        }
    ],
    thumbnail:{
        type: String,
        required: true,
    },
    tag:[
        {
            type: [String],
            required: true
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'category'
    },
    studentEnrolled:[
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'user'
        },
    ]
    ,instructions: {
        type: [String],
    },
    status: {
        type: String,
        enum: ["Draft", "Published"]
    }
});

module.exports = mongoose.model('Course',courseSchema);