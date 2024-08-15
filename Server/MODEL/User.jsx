const mongoose = require('mongoose');
const { resetPassword } = require('../CONTROLLER/resetPassword');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
    },
    accountType:{
        type: String,
        required: true,
        enum: ['admin','student','instructor']
    },
    additionalDetail:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Profile'
    },
    courses:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Courses'
        }
    ],
    image:{
        type: String,
        required: true,
    },
    courseProgress:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courseProgress'
    },
    token:{
        type: String
    },
    resetPasswordExpires:{
        type: Date
    }
});

module.exports = mongoose.model('User',userSchema);