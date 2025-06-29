const Section = require("../MODEL/Section");
const SubSection = require("../MODEL/SubSection");
const { uploadImageToCloudinary } = require("../UTILS/imageUploader");



exports.createSubSection = async (req, res) => {

    try {
        // fetch details
        const { sectionId, title, description } = req.body;
        // extract video/file
        const video = req.files && req.files.video;
        // validate
        if (!sectionId || !title || !description || !video) {
            return res.status(400).json({
                success: false,
                message: 'All fields are necessary'
            });
        }
        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(
            video,
            process.env.FOLDER_NAME
        );
        // create sub section
        const subSectionDetails = await SubSection.create({
            title: title,
            timeDuration: `${uploadDetails.duration}`,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });
        // update section with the subSection
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $push: {
                    subSection: subSectionDetails._id
                }
            },
            { new: true }
        ).populate('subSection').exec();
        // return res
        return res.status(200).json({
            success: true,
            message: 'Sub-Section Created Successfully',
            data: updatedSection
        });
    } catch (err) {
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
        const { title, description, sectionId} = req.body;
        const subSection = await SubSection.findById(sectionId);

        // data validation 
        if(!subSection ){
            return res.json({
                success: false,
                message: 'SubSection not found',
            })
        }

        if (title !== undefined) {
            subSection.title = title
          }
      
          if (description !== undefined) {
            subSection.description = description
          }
          if (req.files && req.files.video !== undefined) {
            const video = req.files.video
            const uploadDetails = await uploadImageToCloudinary(
              video,
              process.env.FOLDER_NAME
            )
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
          }
      
          await subSection.save();
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
        const { subSectionId , sectionId} = req.body; 

        // data validation 
        if(!subSectionId){
            return res.status(404).json({
                success: false,
                message: 'Missing properties',
            })
        }
        // delete data 
        const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId });
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