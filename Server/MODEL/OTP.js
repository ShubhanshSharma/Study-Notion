const mongoose = require('mongoose');
const mailSender = require('../UTILS/mailSender');

const otpSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    otp:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        required: true,
        expires: 5*60*1000,
    }
});

// function to send mails
async function sendVerificationEmails(email,otp){
    try{
        const mailResponse = await mailSender(email, "verification for StudyNotion", otp);
        console.log('Email sent successfully: ', mailResponse);
    }
    catch(err){
        console.log('error while sending mails: ', err);
        throw err;
    }
}

otpSchema.pre("save", async function(next){
    await sendVerificationEmails(this.email, this.otp);
    next();
})

module.exports = mongoose.model('OTP',otpSchema);