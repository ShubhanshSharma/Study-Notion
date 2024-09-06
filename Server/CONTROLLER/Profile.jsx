const Profile = require("../MODEL/Profile");
const User = require("../MODEL/User");


exports.updateProfile = async (req,res) => {

    try {
        // fetch details
        const {dateOfBirth='', about='', contactNo, gender} = req.body;

        //User ID
        const id = req.user.id;
        // validate
        if(!contactNo || !gender || !id){
            return res.status(400).json({
                success: false, 
                message: 'All fields are required'
            })
        }
        //find profile
        const userDetails = await User.findById(id);
        const profileId = await userDetails.additoinalDetails;
        const profileDetails = await Profile.findById(profileId);

        //update id
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNo = contactNo;
        //different way of updating the db-
        await profileDetails.save();

        //return res
        return res.status(200).json({
            success: true,
            message: 'Profile Updated Successfully',
            profileDetails
        })


    } catch (error) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Couldn\'t update Profile',
            error: error.message,
        })
    }
}

exports.deleteProfile = async (req, res) => {

    try {
        // get profile ID
        const  id = req.user.id;

        //validation
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(400).json({
                success: false, 
                message: 'User not Found'
            })
        }
        //delete Profile
        await Profile.findByIdAndDelete({_id: userDetails.additionalDetails});
        // delete User
        await User.findByIdAndDelete({_id:id});

        //HW: delete user from all the enrolled courses
        //return
        return res.status(200).json({
            success: true,
            message: 'Profile Updated Successfully',
            profileDetails
        }) 
        
    } catch (error) {
        console.log(error);
        return res. status(500).json({
            success: false,
            message: 'Couldn\'t delete the Profile'
        })
    }
}



exports.getAllUserDetails = async (req, res) => {

    try {
        // get profile ID
        const  id = req.user.id;

        //validation
        const userDetails = await User.findById(id).populate('additionalDetails');
        if(!userDetails){
            return res.status(400).json({
                success: false, 
                message: 'User not Found'
            })
        }
         //return
        return res.status(200).json({
            success: true,
            message: 'Profile Fetched Successfully',
            profileDetails
        }) 
        
    } catch (error) {
        console.log(error);
        return res. status(500).json({
            success: false,
            message: 'Couldn\'t fetch the Profile',
            error: error.message
        })
    }
}
