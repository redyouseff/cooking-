const asyncHandler = require('express-async-handler')
const  bcrypt =require("bcrypt")
const apiError = require('../utils/appiError')
const createToken = require('../utils/createToken')
const userModel = require('../model/userModel')
const { uploadMixedImage, uploadSingleImage } = require('../middleware/uploadImage')
const { v4: uuidv4 } = require('uuid');
const sharp= require("sharp")
const mealModel = require('../model/mealModel')


const uploadImage=uploadSingleImage("image");
const resizeImage=asyncHandler(async(req,res,next)=>{
    const fileName =`meal-${uuidv4()}-${Date.now()}.jpeg`
    
   
    if(req.file){
      
        sharp(req.file.buffer).resize(600,600)
        .toFormat("jpeg")
        .jpeg({quality:90})
        .toFile(`uploads/meals/${fileName}`)
        req.body.image=fileName;
      
    }
    
    next();
   
})

const creatMeal=asyncHandler(async(req,res,next)=>{
   
    req.body.user=req.currentUser._id
   const meal=await mealModel.create(req.body)

   if(!meal){

    next (new apiError("there is a prombem on creating your meal please try again",400));
   }
res.status(200).json({status:"success",data:meal})


   

})

const getSpesificMeal=asyncHandler(async(req,res,next)=>{
    const meal=await mealModel.findById(req.params.id).populate("categore").populate("subcategore");
    
    if(!meal){
        next(new apiError(`there is no meal for this id : ${req.params.id}`))
    }
    res.status(200).json({status:"success",data:meal});
})

const getAllMeal=asyncHandler(async(req,res,next)=>{
   const meal =await mealModel.find();
    
    if(!meal){
        next(new apiError("there is no meal ",400));
    }
    res.status(200).json({status:"success",length:meal.length,data:meal})

})


const deleteMeal=asyncHandler(async(req,res,next)=>{
    const meal =await mealModel.findByIdAndDelete(req.params.id)
    if(!req.currentUser._id.equals(meal.user)||req.currentUser.role=="user"){
        next(new apiError("the meal dont belong to your account ",400))
    }
    if(!meal){
        next(new apiError(`there is no meal for this id ${req.params.id}`));
    }
    res.status(200).json({message:"meal is deleted"});

});


const updateMeal=asyncHandler(async(req,res,next)=>{
    const meal =await mealModel.findByIdAndUpdate(req.params.id,req.body)
    if(!req.currentUser._id.equals(meal.user)||req.currentUser.role=="user"){
        console.log(!req.currentUser._id.equals(meal.user))
        
       return next(new apiError("the meal dont belong to your account ",400))
    }
   
    if(!meal){
        return next(new apiError(`there is no meal for this id ${req.params.id}`,400))
    }
   await meal.save();
    res.status(200).json({status:"success",data:meal})
})

const getLoggedUserMeals=asyncHandler(async(req,res,next)=>{
    
  
    const meal =await mealModel.find({user:req.currentUser._id})
   
    if(!meal){
        return next(new apiError(`there is no meal for this id : ${req.currentUser._id}`,400))
    }
    res.status(200).json({status:"success",length:meal.length,data:meal})
})










module.exports={creatMeal,uploadImage,resizeImage,getSpesificMeal,getAllMeal,deleteMeal,updateMeal,getLoggedUserMeals}