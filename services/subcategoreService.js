const asyncHandler = require('express-async-handler')
const  bcrypt =require("bcrypt")
const userModel = require('../model/userModel')
const apiError = require('../utils/appiError')
const { uploadMixedImage, uploadSingleImage } = require('../middleware/uploadImage')
const { v4: uuidv4 } = require('uuid');
const sharp= require("sharp")
const categoreModel = require('../model/categoreModel')
const subcategoreModel = require('../model/subCategoreModel')


const createSubcategore=asyncHandler(async(req,res,next)=>{
   

    const subc=await subcategoreModel.create(req.body);

    if(!subc){
        return next(new apiError("there are an error on creating subc",400));
    }
    res.status(200).json({status:"success",data:subc});

})

const getAllSubcategore=asyncHandler(async(req,res,next)=>{
    const subc=await subcategoreModel.find();
    if(!subc){
        return next(apiError("there an error on finding subc",400))
    }
    res.status(200).json({status:"success",length:subc.length,data:subc});
})

const getSpesificSubcategore=asyncHandler(async(req,res,next)=>{
    const subc=await subcategoreModel.findById(req.params.id)
    if(!subc){
        return next (new apiError(`there is no subcategore on this id ${req.params.id}`))
    }
    res.status(200).json({status:"success",data:subc});
})

 const deleteSubcategore=asyncHandler(async(req,res,next)=>{

    const subc=await subcategoreModel.findByIdAndDelete(req.params.id);
    if(!subc){
        return next(new apiError(`there is no subc for this id${req.params.id}`))
    }

        res.status(200).json({status:"success",message:`subc for this id ${req.params.id} is deleted `})


 })

 const updataSubcategore=asyncHandler(async(req,res,next)=>{
    const  subc=await subcategoreModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!subc){
        return next(new apiError(`there is no  subc for this id ${req.params.id}`))
    }
subc.save();
    res.status(200).json({status:"success",data:subc})

 })

 


 module.exports= {updataSubcategore,deleteSubcategore,getSpesificSubcategore,getAllSubcategore,createSubcategore}