const Course = require('../MODEL/Course');
const Tag = require('../MODEL/tag');
const Category = require("../MODEL/Category");
const User = require('../MODEL/User');
const {uploadImageToCloudinary} = require('../UTILS/imageUploader');



exports.createCourse = async (req, res) => {

    try{
		// Get user ID from request object
		const userId = req.user.id;

        // fetch data
        let {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tag,
			category,
			status,
			instructions,
		} = req.body;
        // Get thumbnail image from request files
		const thumbnail = req.files.thumbnailImage;

        // validation
        if(
			!courseName ||
			!courseDescription ||
			!whatYouWillLearn ||
			!price ||
			!tag ||
			!thumbnail ||
			!category
		){
            return res.status(400).json({
                success: false,
                message: 'All fields are necessary to be filled'
            })
        }
        
		if (!status || status === undefined) {
			status = "Draft";
		}

        // check for instructor
        const instructorDetails = await User.findById(userId,{
            accountType: "Instructor"
        });
        console.log('intructor detals =>', instructorDetails);
        //TODO: verify that userID and instructorDetails._id are same?

        if(!instructorDetails){
            return res.status(404).json({
                success: false,
                message: 'Instructor Details Not Found'
            })
        }

        // check if tag is valid?
        const categoryDetails = await Category.findById(category);
		if (!categoryDetails) {
			return res.status(404).json({
				success: false,
				message: "Category Details Not Found",
			});
		}

        //Upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(
            thumbnail, 
            process.env.FOLDER_NAME
        );

        // Create new Course
        const newCourse = await Course.create({
			courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			tag: tag,
			category: categoryDetails._id,
			thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions: instructions,
		});

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
		// Handle any errors that occur during the creation of the course
        console.log(err);
        return res.status(500).json({
            success: false,
            error: err.message,
            message: 'Failed to create course'
        })
    }
}

exports.getAllCourses = async (req, res) => {
    try{
        // TODO: change the below statement incrementally
        const allCourses = await Course.find({},
            {
				courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnroled: true,
			}
        ).populate('instructor')
        .exec();

        // return response
        return res.status(200).json({
            success: true,
            message: 'Data of all coursed fetched Succesfully',
            data: allCourses
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

exports.getCourseDetails = async (req, res) => {
    try{
        //get id
        const {courseID} = req.body;
        //find course details
        const courseDetails = await Course.find(
            {_id: courseID}
        ).populate(
        {
            path: "instructor",
            populate:{
                path:"additionalDetails"
            },
        }
        )
        .populate("category")
        .populate('ratingsAndReviews')
        .populate({
            path:'courseContent',
            populate:{
                path: 'subSection',

            },
        })
        .exec();

        if(!courseDetails){
            return res.status(400).json({
                success: false,
                message: `Cannot fetch Course Data of ${courseID}`,
                error: err.message,
            })
        }

        // return response
        return res.status(200).json({
            success: true,
            message: 'Data of all coursed fetched Succesfully',
            data: courseDetails
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