const asyncHandler = require('express-async-handler')
const  bcrypt =require("bcrypt")
const userModel = require('../model/userModel')
const apiError = require('../utils/appiError')
const { read } = require('fs')
const { SuiteContext } = require('node:test')
const { uploadMixedImage, uploadSingleImage } = require('../middleware/uploadImage')
const { v4: uuidv4 } = require('uuid');
const sharp= require("sharp")


const uploadImage=uploadSingleImage("profileImage");
const resizeImage=asyncHandler(async(req,res,next)=>{
    const fileName =`user-${uuidv4()}-${Date.now()}.jpeg`
    sharp(req.file.buffer).resize(600,600)
    .toFormat("jpeg")
    .jpeg({quality:90})
    .toFile(`uploads/users/${fileName}`)
    req.body.profileImage=fileName;
    next();
})

const createUser=asyncHandler(async(req,res,next)=>{
  

           const hash=  await bcrypt.hash(req.body.password,12)
           req.body.password=hash
           const user=await userModel.create(req.body);
           if(!user){
                return next (new ("some thing went wrong when creating user ",400))
           }
           
   res.status(200).json({status:"successs",data:user})
})


const getSpecificUser=asyncHandler(async(req,res,next)=>{
    console.log(req.params.id)
    const user =await userModel.findById(req.params.id)
    if(!user){
        return next (new apiError(`there is no user for this id ${req.params.id}`,400))
    }
    res.status(200).json({status:"success",data:user})


})

const getAllUsers=asyncHandler(async(req,res,next)=>{
    const user =await userModel.find();
    if(!user){
        return next(new apiError("there is no user on your database",400))
    }
    res.status(200).json({status:"success",data:user})
})


const deleteUser=asyncHandler(async(req,res,next)=>{
    const user =await userModel.findByIdAndDelete(req.params.id)
    if(!user){
        return next (new apiError(`there is no user for this id ${req.params.id}`,400))
    }
    res.status(200).json({status:"success",message:`user for this id: ${req.params.id} is deleted `})
})

const updateLoggedUser=asyncHandler(async(req,res,next)=>{
    console.log(req.currentUser)
    const user =await userModel.findByIdAndUpdate(req.currentUser._id,req.body,{new:true})
    res.status(200).json({data:user})
})

const deleteLoggedUser=asyncHandler(async(req,res,next)=>{
    const user =await userModel.findByIdAndUpdate(req.currentUser._id,{
        active:false,
    })
    res.status(200).json({status:"success"})
})



module.exports={createUser,getSpecificUser,getAllUsers,deleteUser,uploadImage,resizeImage,updateLoggedUser,deleteLoggedUser}