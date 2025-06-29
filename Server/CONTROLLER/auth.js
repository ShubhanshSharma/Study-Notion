const User = require('../MODEL/User');
const OTP = require('../MODEL/OTP');
const otpGenerator = require("otp-generator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('../UTILS/mailSender');
const Profile = require('../MODEL/Profile');
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

        console.log("Result is Generate OTP Func");
		console.log("OTP", otp);
		console.log("Result", result);

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
        console.log('OTP body', OTP.find({email}).sort({createdAt: -1}).limit(1));

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
        } else if(otp != recentOtp[0].otp){
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        
		// Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

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
            accountType: accountType,
            approved: approved,
            additionalDetails: profileDetails._id,
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
                expiresIn: '24hr',
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


// Controller for Changing Password
exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};