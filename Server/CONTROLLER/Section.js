const Section = require('../MODEL/Section');
const Course = require('../MODEL/Course');


exports.createSection = async (req, res) => {

    console.log("before createSection try")

    try{

        // Data fetch
        const {
            sectionName,
            courseId    
        } = req.body;

        console.log("req in createSection-->", req.body)
        // data validation
        if(!sectionName || !courseId){
            return res.json({
                success: false,
                message: 'Missing properties'
            })
        }
        // create section 
        const createSection = await Section.create({sectionName});
        console.log('created section-', createSection);

        // update course with section Object ID 
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent: createSection._id
                }
            },
            {new: true}   
        )
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();

        // return response
        return res.status(200).json({
            success: true, 
            message: 'Section created Successfuly',
            updatedCourseDetails,
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Couldn\'t create the Section',
            error: err.message,
        })
    }
}

exports.updateSection = async (req,res) => {

    try{
        // data input
        const { sectionName, sectionId} = req.body; 

        // data validation 
        if(!sectionName || !sectionId){
            return res.json({
                success: false,
                message: 'Missing properties',
            })
        }
        // update data 
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId, 
            {sectionName}, 
            {new: true})
        // return res
        return res.status(200).json({
            success: true,
            message: ' Section Updated Succcessfully',
            data : updatedSection
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Couldn\'t update the Section',
            error: err.message,
        })
    }
}

exports.deleteSection = async (req,res) => {

    try{
        // data input
        const { sectionId} = req.body; 

        // data validation 
        if(!sectionId){
            return res.json({
                success: false,
                message: 'Missing properties',
            })
        }
        // delete data 
        await Section.findByIdAndDelete(sectionId);
        // return res
        return res.status(200).json({
            success: true,
            message: ' Section Deleted Succcessfully',
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Couldn\'t delete the Section, Please try again',
            error: err.message,
        })
    }
}