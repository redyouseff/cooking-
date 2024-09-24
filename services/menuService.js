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

module.exports= {createMenu}