const asyncHandler = require('express-async-handler')
const  bcrypt =require("bcrypt")
const apiError = require('../utils/appiError')
const createToken = require('../utils/createToken')
const userModel = require('../model/userModel')
const { uploadMixedImage, uploadSingleImage } = require('../middleware/uploadImage')
const { v4: uuidv4 } = require('uuid');
const sharp= require("sharp")
const mealModel = require('../model/mealModel')
const menuModel = require('../model/menuModel')


const createMenu=asyncHandler(async(req,res,next)=>{
    req.body.user=req.currentUser;
    const menu=await menuModel.create(req.body)
    if(!menu){
        return next(new apiError("there is an error on creating menu",400))
    }
    res.status(200).json({status:"success",data:menu})
})

const getAllMenu=asyncHandler(async(req,res,next)=>{
    const menu =await menuModel.find()
    if(!menu){
        return next(new apiError("there is an error on finding the menu",400));
    }
    res.status(200).json({status:"success",length:menu.length,data:menu});
})

const getSpecificMenu=asyncHandler(async(req,res,next)=>{
    const menu =await menuModel.findById(req.params.id);
    if(!menu){
        return next(new apiError(`there is no menu for this id ${req.params.id}`,400))
    }
    res.status(200).json({status:'success',data:menu});
})

const getLoggedUserMenu=asyncHandler(async(req,res,next)=>{

    const menu=await menuModel.find({user:req.currentUser._id})
    if(!menu){
        return next(new apiError(`there is no menu for this user ${req.currentUser._id}`));
    }
    res.status(200).json({status:"success",length:menu.length,data:menu,})
})

const deleteMenu=asyncHandler(async(req,res,next)=>{
    const menu=await menuModel.findByIdAndDelete(req.params.id)
    if(!menu){
        return next(new apiError(`there is no menu for this id ${req.params.id}`,400));
    }
    res.status(200).json({status:"success",message:`menu for this id is deleted ${req.params.id}`})

});

const  updateMenu=asyncHandler(async(req,res,next)=>{
     const menu=await menuModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
     if(!menu){
        return next(new apiError(`there is no menu for this id ${req.params.id}`,400));
     }
     menu.save();
     res.status(200).json({status:"success",data:menu});
})


module.exports= {createMenu,updateMenu,deleteMenu,getLoggedUserMenu,getSpecificMenu,getAllMenu}