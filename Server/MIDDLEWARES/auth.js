// auth, isAdmin, isStudent

// requirements ->  jsonwebtokens, secret key

const jwt = require("jsonwebtoken");

require("dotenv").config();     // gets the env file variables

const User = require('../MODEL/User');

exports.auth = async (req, res, next) => {

    try{
        console.log('req body for auth-', req.body);
        console.log('coockie-', req.cookies.token); 
        //extract token
        const token = req.body.token 
                        || req.cookies.token 
                        || (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));

        if(!token){
            return res.status(401).json({
                success: false,
                message:'token is missing',
                
            })
        }

        //verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log('decode ', decode);

            req.user = decode;
            console.log('auth is successfull');
        }catch(error){
            return res.status(401).json({
                success: false,
                message:'token is invalid. token-',
                error: error.message,
                request : req.body,
            })
        }
        next();   // this function forwards to next handler. ==> see user.js

    }catch(error){
        return res.status(401).json({
            success: false,
            message:'something went wrong while verifying token',
            error: error.message,
            request: req.body
        })
    }
}

exports.isStudent = async (req, res , next) =>{

    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success: false,
                message:'This is a protected route for a students only'
            })
        }
        next();

    }catch(err){
        return res.status(500).json({
            success: false,
            message:'user role is cannot be verified, Please try again later'
        })
    }
}

exports.isInstructor = async (req, res , next) =>{

    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success: false,
                message:'This is a protected route for a Instructors only'
            })
        }
        next();
        
    }catch(err){
        return res.status(500).json({
            success: false,
            message:'user role is cannot be verified, Please try again later'
        })
    }
}

exports.isAdmin = async (req, res , next) =>{

    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success: false,
                message:'This is a protected route for a Admins only'
            })
        }
        next();
        
    }catch(err){
        return res.status(500).json({
            success: false,
            message:'user role is cannot be verified, Please try again later'
        })
    }
}