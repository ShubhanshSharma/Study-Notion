const RatingsAndReviews = require('../MODEL/RatingsAndReviews');
const Course = require('../MODEL/Course');
const User = require('../MODEL/User');
const { default: mongoose } = require('mongoose');


//create rating 
exports.createRating = async (req,res) => {

    try {
        //get userID
        const userID = req.user.id;
        //fetch data
        const {rating, review, courseID} = req.body;
        // has user bought the course??
        const courseDetails = await Course.findOne(
            {_id: courseID,
                studentEnrolled:{$elementMatch: {$eq: userID}},
            }
        )
        //validate data
        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: "student is not enrolled in the Course",
            })
        }
        //has user already reviewed the course
        const alreadyReviewed = await RatingsAndReviews.findOne({
            user: userID,
            course: courseID, 
        })

        if(alreadyReviewed){
            return res.status(403).json({
                success: false,
                message: 'Course is already reviewed by the user'
            })
        }
        // create rating and reviev 
        const ratingReview  = await  RatingsAndReviews.create({
            rating, review, 
            course: courseID,
            user: userID,
        })
        // update course rating and review
        const updatedCourse = await Course.findByIdAndUpdate(courseID,
            {
                $push:{
                    ratingsAndReviews: ratingReview._id,
                }
            }
        )
        console.log(updatedCourse);

        //return response
        return res.status(200).json({
            success: true,
            message: 'Rating and Review created successfully',
            ratingReview
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Could not create Rating and Review'
        })
    }
}



// getAverageRating
exports.getAverageRating = async (req, res) => {

    try {
        const courseID = req.body.courseID;

        
        const result = await RatingsAndReviews.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseID),
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: {$avg: '$rating'},
                }
            }
        ])

        //rating check
        if(result.length > 0){
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            })
        } 

        //if no rating
        return res.status(200).json({
            success: true,
            message: 'Average rating is zero. NO rating given',
            averageRating: 0,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Could not find average Rating'
        })
    }
}



// getAllRating

exports.getAllRating = async (req,res) => {

    try {
        
        const allReviews = await RatingsAndReviews.find({})
        .sort({rating: 'desc'})
        .populate({
            path: 'user',
            select: 'firstName lastName email image',
            
        })
        .populate({
            path: 'course',
            select: 'courseName'
        })
        .exec();


        return res.status(200).json({
            success: true,
            message: 'all reviews fetched',
            data : allReviews,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Could not find all Rating'
        })
    }
}