const Section = require("../MODEL/Section");
const SubSection = require("../MODEL/SubSection");
const { uploadImageToCloudinary } = require("../UTILS/imageUploader");



exports.createSubSection = async (req, res) => {

    try{

        //fetch details
        const {sectionId, title, timeDuration, description} = req.body;
        //extract video/file
        const video = req.files.videoFile;
        //validate
        if(!sectionId || !title || !timeDuration || !description){
            return res.status(400).json({
                success: false,
                message: 'ALl fields are necessary'
            })
        }
        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        //create sub section
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url,
        })
        //update section with the subSection
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                                {
                                                                    $push:{
                                                                        subSection:subSectionDetails._id
                                                                    }
                                                                },
                                                                {new: true}
        )
        //return res
        return res.status(200).json({
            success: true,
            message: 'Sub-Section Created Successfully',
            updatedSection
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error in creating subsection',
            error: err.message
        })
    }
}

exports.updateSubSection = async (req,res) => {

    try{
        // data input
        const { subSectionTitle, subSectionId} = req.body;

        // data validation 
        if(!subSectionTitle || !subSectionId){
            return res.json({
                success: false,
                message: 'Missing properties',
            })
        }
        // update data 
        const updatedSubSection = await SubSection.findByIdAndUpdate(subSectionId, {subSectionTitle}, {new: true})
        // return res
        return res.status(200).json({
            success: true,
            message: 'Sub-Section Updated Succcessfully',
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Couldn\'t update the Sub-Section',
            error: err.message,
        })
    }
}

exports.deleteSubSection = async (req,res) => {

    try{
        // data input
        const { subSectionId} = req.body; 

        // data validation 
        if(!subSectionId){
            return res.json({
                success: false,
                message: 'Missing properties',
            })
        }
        // delete data 
        await SubSection.findByIdAndDelete(subSectionId);
        // return res
        return res.status(200).json({
            success: true,
            message: 'Sub-Section Deleted Succcessfully',
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Couldn\'t delete the Sub-Section, Please try again',
            error: err.message,
        })
    }
}