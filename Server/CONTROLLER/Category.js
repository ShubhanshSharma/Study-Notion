const { default: mongoose } = require('mongoose');
const Category = require('../MODEL/Category');
const Course = require('../MODEL/Course');


exports.createCategory = async (req,res) => {

    try {

        const {name, description} = req.body;

        if(!name || !description) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        const categoryDetails = await Category.create({
            name: name,
            description: description
        })
        console.log(CategorysDetails);
		return res.status(200).json({
			success: true,
			message: "Categorys Created Successfully",
		});
    } catch (error) {
        return res.status(500).json({
			success: true,
			message: error.message,
		});
    }
}


exports.showAllCategories = async (req,res) => {

    try {
        const allCategorys = await Category.find(
			{},
			{ name: true, description: true }
		);
		res.status(200).json({
			success: true,
			data: allCategorys,
		});
    } catch (error) {
        return res.status(500).json({
			success: false,
			message: error.message,
		});
    }
}



exports.categoryPageDetails = async (req,res) => {

    try {
        // get category ID
        const {categoryID} = req.body;

        //get courses for specific category
        const selectedCategory = await Category.findById(categoryID)
        .populate("courses")
        .exec();


        //validation
        if(!selectedCategory){
            return res.status(400).json({
                success: false,
                message: 'could not get data',
            })
        }

        //get courses for different category
        const differentCategories = await Category.find({
            _id: {$ne: categoryID},
        })
        .populate("courses")
        .exec();

        // if(!differentCategories){
        //     return res.status(400).json({
        //         success: false,
        //         message: 'could not get data',
        //     })
        // }

        // find top selling courses
        const topSellingCourse = await Course.aggregate([
            {
                $match:{
                    category: new mongoose.Types.ObjectId(categoryID),
                }
            },
            {
                $sort: { "studentEnrolled": -1 }
            },            
            {
                $limit: 10
            },
        ])
        
        return res.status(200).json({
            success: true,
            selectedCategory,
            differentCategories,
            topSellingCourse,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}