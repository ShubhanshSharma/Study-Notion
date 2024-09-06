const { default: mongoose } = require('mongoose');
const {instance} = require('../CONFIG/razorpay');
const Course = require('../MODEL/Course');


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
        const uid = new mongoose.Types.ObjectId(userID.toString());
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

    const webhookSecret = '';

    const signature = req.headers["x-razorpay-signature"];
}