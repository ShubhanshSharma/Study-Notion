const Course = require('../MODEL/Course');
const Tag = require('../MODEL/tag');
const User = require('../MODEL/User');
const {uploadImageToCloudinary} = require('../UTILS/imageUploader');



exports.createCourse = async (req, res) => {

    try{
        // fetch data
        const {courseName , 
            courseDescription,
            whatYouWillLearn, 
            price,
             tag} = req.body;

        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag){
            return res.status(400).json({
                success: false,
                message: 'All fields are necessary to be filled'
            })
        }

        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log('intructor detals =>', instructorDetails);
        //TODO: verify that userID and instructorDetails._id are same?

        if(!instructorDetails){
            return res.status(404).json({
                success: false,
                message: 'Tag details are necessary'
            })
        }

        // check if tag is valid?
        const tagDetails = await Tag.findById(userId);
        if(!tagDetails){
            return res.status(404).json({
                success: false,
                message: 'Tag details are necessary'
            })
        }

        //Upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // Create new Course
        const newCourse = await Course.create({
            courseName , 
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn, 
            price,
            tag: tagDetails._id,
            thumbnail: thumbnailImage.secure_url,
        })

        //Add the new course to the user schema of the instructor
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push:{
                    courses: newCourse._id,
                }
            },
            {
                new:true,
            }
        )


        return res.status(200).json({
            success: true,
            message: 'Course created Successfully',
            data: newCourse,   
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.showAllCourses = async (req, res) => {
    try{
        // TODO: change the below statement incrementally
        const allCourses = await Course.find({});

        // return response
        return res.status(200).json({
            success: true,
            message: 'Data of all coursed fetched Succesfully'
        })
        
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Cannot fetch Course Data',
            error: err.message,
        })
    }
}