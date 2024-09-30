const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    gender:{
        type: String,
        required: false,
        enum: ['Male','Female','other']
    },
    about:{
        type: String,
        trim: true
    },
    dateOfBirth:{
        type: String,
        // required: true,
        // trim: true
    },
    contactNumber:{
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('Profile',profileSchema);