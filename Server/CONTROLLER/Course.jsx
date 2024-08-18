const Course = require('../MODEL/Course');
const Tag = require('../MODEL/tag');
const User = require('../MODEL/User');
const imageUploaderCloudinary = require('../UTILS/imageUploader');



exports.createCourse = async (req, res) => {

    try{
        // fetch data
        const {name , description} = req.body;

        // validation
        if(!name|| !description){
            return res.status(400).json({
                success: false,
                message: 'All fields are necessary to be filled'
            })
        }

        // Create entry in DB
        const tagDetails = await Tag.create({
            name: name, 
            description: description
        });
        console.log(tagDetails);

        // retutn response
        return res.status(200).json({
            success: false,
            message: 'Tag created Succesfully'
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
        const allTags = await Tag.find({}, {name: true, description: true});

        // retutn response
        return res.status(200).json({
            success: false,
            message: 'Tag created Succesfully'
        })
        
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}