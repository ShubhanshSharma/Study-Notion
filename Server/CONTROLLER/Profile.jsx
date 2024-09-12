const Profile = require("../MODEL/Profile");
const User = require("../MODEL/User");
const { uploadImageToCloudinary } = require("../UTILS/imageUploader");


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
        const profile = await Profile.findById(userDetails.additionalDetails);

        //update id
        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        profile.gender = gender;
        profile.contactNo = contactNo;
        //different way of updating the db-
        await profile.save();

        //return res
        return res.status(200).json({
            success: true,
            message: 'Profile Updated Successfully',
            profile
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
        const user = await User.findById(id);
        if(!user){
            return res.status(400).json({
                success: false, 
                message: 'User not Found'
            })
        }
        //delete Profile
        await Profile.findByIdAndDelete({_id: user.userDetails});
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
        const userDetails = await User.findById(id).populate('additionalDetails').exec();
        if(!userDetails){
            return res.status(400).json({
                success: false, 
                message: 'User not Found'
            })
        }
		console.log(userDetails);
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

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image);
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};