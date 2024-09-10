const asyncHandler = require('express-async-handler')
const  bcrypt =require("bcrypt")
const apiError = require('../utils/appiError')
const createToken = require('../utils/createToken')
const userModel = require('../model/userModel')
const { uploadMixedImage, uploadSingleImage } = require('../middleware/uploadImage')
const { v4: uuidv4 } = require('uuid');
const sharp= require("sharp")
const { token } = require('morgan')
const jwt =require("jsonwebtoken")

const uploadImage=uploadSingleImage("profileImage");
const resizeImage=asyncHandler(async(req,res,next)=>{
    const fileName =`user-${uuidv4()}-${Date.now()}.jpeg`
    
   
    if(req.file){
      
        sharp(req.file.buffer).resize(600,600)
        .toFormat("jpeg")
        .jpeg({quality:90})
        .toFile(`uploads/users/${fileName}`)
        req.body.profileImage=fileName;
      
    }
    
    next();
   
})


const signup=asyncHandler(async(req,res,next)=>{
    
   if(req.body.password){
    const hash =await bcrypt.hash(req.body.password,12)
   
    req.body.password=hash;
   }
    const user =await userModel.create(req.body)
    if(!user){
        return next (new apiError("there is problem on creating this account try again ",400))
    }
    const token =createToken(user._id)
    res.status(200).json({status:"success",data:user,token:token})

    
})



const login=asyncHandler(async(req,res,next)=>{

    const user =await userModel.findOne({email:req.body.email})

   if(!user || !(await bcrypt.compare(req.body.password,user.password))){
    return next (new apiError("email or password are not correct"))
   }

   const token =createToken(user._id)
   res.status(200).json({status:"success",data:user,token:token })
     
})

const  protect=asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer")){
        token =req.headers.authorization.split(" ")[1];
    }
    else{
        return next(new apiError("you are not logged in ",400))
    }
    const decoded= jwt.verify(token,process.env.JWT_SECRET_KEY)
    
    const user =await userModel.findById(decoded.userid)
    if(!user){
        return next (new apiError("user is no longer exsist",400))
    }
    req.currentUser=user;
    next();

})

const allowedTo=(...roles)=>{
    
  return asyncHandler(async(req,res,next)=>{
    if(!roles.includes(req.currentUser.role)){
        return next (new apiError("you are not allwed to access this route",400))
    }
    next();
  })
}







module.exports={signup,resizeImage,uploadImage,login,protect,allowedTo}