
const sendMail = require('../UTILS/mailSender');
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require('../MODEL/User');


exports.resetPasswordToken = async (req, res) => {
    try {
        const  {email}  = req.body;
        console.log(User);

        const isUserPresent = await User.findOne({ email: email });

        if (!isUserPresent) {
            return res.status(401).json({
                success: false,
                message: 'This Email isn\'t registered with us'
            });
        }

        // generate token
        const token = crypto.randomBytes(20).toString("hex");

        // update User
        const updateDetails = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 60 * 60 * 1000,
            },
            { new: true }
        ); // Returns updated document. If not used returns old document

        console.log("DETAILS-", updateDetails);

        const url = `http://localhost:3000/update-password/${token}`;

        await sendMail(email, 'Password Reset Link', `Password reset link => ${url}`);

        res.json({
            success: true,
            message: 'Password reset link sent successfully, please check your email',
            url
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong in sending reset password link'
        });
    }
};



exports.resetPassword = async (req,res) => {

    try{
    
        // fetch data

        const {password, token , confirmPassword} = req.body;

        // validate
        if(password != confirmPassword){
            return res.status(401).json({
                success: false,
                message: 'New Password and Confirm Password doesn\'t match'
            })
        }

        // fetch user details form db
        const userDetails = await User.findOne({token: token});

        // if no entry -invalid token
        if(!userDetails){
            return res.json({
                success: false,
                message: 'invalid token'
            })
        }

        // token time check
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success: false,
                message: 'the token is expired, please regerate the token'
            })
        }
        // hash password 
        const hashedPassword = await bcrypt.hash(password, 10);

        // update in db
        await User.findOneAndUpdate(
            { token: token}, 
            { password: hashedPassword}, 
            {new: true}
        );

        // return response
        res.status(200).json({
            success: true,
            message: 'Password Reset succesfull'
        })
    }catch(err){
        console.log(err);
        return res.status(400).json({
            success: false,
            message: 'Password Reset Unsuccesfull'
        })
    }
}