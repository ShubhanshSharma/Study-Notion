
const { validate } = require('../MODEL/OTP');
const User = require('../MODEL/User');
const sendMail = require('../UTILS/mailSender');


exports. resetPasswordToken = async (req, res) => {

    try{
        const {email} = req.body();

        const isUserPresent = User.findOne({email: email});

        if(!isUserPresent){
            return res.status(401).json({
                success: false,
                message: 'This Email isn\'t registered with us'
            })
        }

        // generate token
		const token = crypto.randomBytes(20).toString("hex");
        

        // update User
        const updateDetails = User.findOneAndUpdate({email: email},
                                                    {
                                                        token: token,
                                                        resetPasswordExpires: Date.now() + 5*60*1000,

                                                    },
                                                    {new: true}
        );// Returns updated document. If not used returns old document

		console.log("DETAILS", updatedDetails);

        const url= `http://localhost:3000/udate-password/${token}`;

        await sendMail(email, 'Password Reset Link', `Password reset link => ${url}`);

        res.josn({
            success: true,
            message: 'Password reset link sent successfully, please check your email'
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: ' something went wrong in sending reset password link'
        })
    }
}



exports. resetPassword = async (req,res) => {

    try{
    
        // fetch data

        const {password, token , confirmPassword} = req.body();

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
        if(userDetails.resetPasswordExpires > Date.now()){
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