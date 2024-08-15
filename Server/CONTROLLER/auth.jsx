const User = require('../MODEL/User');
const OTP = require('../MODEL/OTP');
const otpGenerator = require("otp-generator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('../UTILS/mailSender');
require('dotenv').config();

exports.sendOTP = async (req, res) => {

    try{

        // fetch email from request body
        const {email} = req.body;

        // check if user exists??
        const checkUserPresent = await User.findOne({email});

        // return if user exists
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: 'User already registered',
            })
        }

        // Generate OTP
         var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
         });
         console.log('OTP generated- ', otp);


        //  check if otp is unique or not
        let result = await OTP.findOne({otp: otp});

        while(result){
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
        let result = await OTP.findOne({otp: otp});
        }
        
        const otpPayload = {email, otp};

        // create otp entry in db
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        // Return successful response
        return res.status(200).json({
            success: true,
            message: 'OTP sent successfuly',
            otp,
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

// sign - up

exports.signUp = async (req, res) => {

    try{
        // fetch necessary data
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNo ,
            otp
        } = req.body;

        // validate it

        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success: false,
                message: 'All fields are necessary to fill'
            })
        }
        // match both passwords
        if(password!= confirmPassword){
            return res.status(400).json({
                success: false,
                message: 'Passwords in both fields need to be same'
            })
        }

        // check if user exists?
        const userExist = await User.findOne({email});

        if (userExist){
            return res.status(400).json({
                success: false,
                message: 'User already exist',
            })
        }
        
        // find recent OTP
        const recentOtp = await OTP.find({email}).sort({createdAt: -1}).limit(1);
        console.log(recentOtp);

        // validate OTP
        if(recentOtp.length == 0){
            // OTP not found
            return res.status(400).json({
                success: false,
                message: 'OTP not found'
            })
        } else if(otp != recentOtp.otp){
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create entry in DB

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNo: null
        })

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNo,
            password: hashedPassword,
            accountType,
            additionalDetail: profileDetails._id,
            image:`https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`
        });

        return res.status(200).json({
            success: true, 
            message: 'User registered succesfully'
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'could not register the user'
        })
    }

}


// LOGIN

exports.logIn = async (req,res) => {

    try{

        // fetch the details
        const {
            email,
            password,
        } = req.body;

        if (!email || !password){
            return res.status(403).json({
                success : false,
                message : 'All fields are necessary to be filled correctly'
                
            })
        }


        // User exists? 
        const user = await User.findOne({email}).populate('additionalDetails');

        if(!user){
            return res.status(401).json({
                success: false,
                message: 'User not registered. Sign-up first'
            })
        }

        // correct password?

        // generate jwt
        if (await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '2hr',
            })
            user.token = token;
            user.password = undefined;

            // create cookie and send response  
            const option = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie("token", token, option).json({
                success: true,
                token,
                user,
                message: "Logged in successfully"
            })

        }else{
            return res.status(401).json({
                success: false,
                message: 'Password is incorrect'
            })
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Login failure, Please try again"
        })
    }
}


exports.changePassword = async (req, res) => {

    // fetch data 
    // get oldPassword, newPassword, confirmPassword 
    // validate 

    // update password in DB 
    // send mail of Password updat 
    // return response

    const {email, password, newPassword, confirmPassword} = req.body();

    const user = await User.findOne({email});
    

    if (await bcrypt.compare(password, user.password)){
        // const payload = {
        //     email: user.email,
        //     id: user._id,
        //     accountType: user.accountType,
        // }
        // const token = jwt.sign(payload, process.env.JWT_SECRET, {
        //     expiresIn: '2hr',
        // })
        // user.token = token;
        // user.password = undefined;

        // create cookie and send response  
        // const option = {
        //     expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        //     httpOnly: true
        // }
        // res.cookie("token", token, option).json({
        //     success: true,
        //     token,
        //     user,
        //     message: "Logged in successfully"
        // })

        if(newPassword != confirmPassword){
            return res.status(401).json({
                success: false,
                message: 'New Password and Confirm Password doesn\'t match'
            })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create entry in DB

        await User.updateOne({ email}, { $set: { password: hashedPassword } });

        sendMail(email, 'Password Changed', "Your Password for Studynotion is Changed Succesfully");

        return res.status(200).json({
            success: true, 
            message: 'Your Password Changed succesfully'
        });



    }else{
        return res.status(401).json({
            success: false,
            message: 'Password is incorrect'
        })
    }


}