const { default: mongoose } = require("mongoose");
const {instance} = require('../CONFIG/razorpay');
const Course = require('../MODEL/Course');
const User = require('../MODEL/User');
const mailSender = require('../UTILS/mailSender');


//Capture payment

exports.capturePayment = async (req, res) => {

    //get course user ID
    const userID = req.user.id;
    const course_id = req.body;
    //validate
    //valid course ID?
    if(!course_id){
        return res.json({
            success: false,
            message: 'Could not find course'
        })
    }
    //valid courseDetail??
    let course;
    try {
        course = await Course.findById(course_id);
        if(!course){
            return res.json({
                success: false,
                message: 'Could not find the Course'
            })
        }

        //user already purchased the same course??
        // the userID is in string format
        // convert it into object of that id 
        // because it is stored in course in object format 
        // to check the users in that Course
        const uid = new mongoose.Types.ObjectId(userID);
        if(course.studentEnrolled.includes(uid)){
            return res.status(200).json({
                success: false,
                message: 'Student is already enrolled in the course',
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
    //order create
    const amount = course.price;
    const currency = "INR";

    const options = {
        amount: amount* 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        // as the request didnt came from front-end
        // but from razorpay we cant access user/course ID
        // this notes are usefull cuz this is the only way we can access them 
        // for adding courseID in usercourses array and userID in Course sudentsEnrolled array
        // after verifying 
        notes:{
            courseID: course_id,
            userID,
        }
    };

    try{
        // initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse); 

        return res.status(200).json({
            success: true,
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            orderID: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
        })
    }catch(err){
        console.log(err);
        res.json({
            success: false,
            message: 'could not create order'
        })
    }
    //response
}



//verify signature of razorpay and server

exports.verifySignature = async (req, res) => {

    const webhookSecret = '123456';

    const signature = req.headers["x-razorpay-signature"];

    const shasum  = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature === digest){
        console.log('Payment is Authorised');
        
        const {courseID, userID} = req.body.payload.payment.entity.notes;

        try {
            // fulfill the action

            //find the course and enroll 
            const enrolledCourse = await Course.findOneAndUpdate(
                                            {_id: courseID},
                                            {$push: {studentEnrolled: userID}},
                                            {new: true},
            )

            if(!enrolledCourse){
                return res.status(500).json({
                    success: false,
                    message: 'Course not found'
                });
            }

            console.log(enrolledCourse);

            // add course in student model
            const enrolledStudent = await User.findOneAndUpdate(
                                        {_id: userID},
                                        {$push: {courses: courseID}},
                                        {new: true},
            )

            if(!enrolledStudent){
                return res.status(500).json({
                    success: false,
                    message: 'Student not found'
                });
            }

            console.log(enrolledStudent);

            const mailResponse = await mailSender(
                enrolledStudent.email,
                "Congratulations from StudyGraha",
                "Congratulations for joining your new Course"
            )

            console.log(mailResponse);
            return res.status(200).json({
                success: true,
                message: 'Signature Verified and Course alloted'
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }


    }else{
        return res.status(400).json({
            success: false,
            message:"invalid Request",
        })
    }
    
}