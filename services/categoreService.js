const asyncHandler = require('express-async-handler')
const apiError = require('../utils/appiError')
const { uploadMixedImage, uploadSingleImage } = require('../middleware/uploadImage')
const { v4: uuidv4 } = require('uuid');
const sharp= require("sharp")
const categoreModel = require('../model/categoreModel');
const subcategoreModel = require('../model/subCategoreModel');



const uploadImage=uploadSingleImage("image");
const resizeImage=asyncHandler(async(req,res,next)=>{
    const fileName =`categore-${uuidv4()}-${Date.now()}.jpeg`
    if(req.file){
        
        sharp(req.file.buffer).resize(600,600)
        .toFormat("jpeg")
        .jpeg({quality:90})
        .toFile(`uploads/categores/${fileName}`)
        req.body.image=fileName;
       

    }
   
    next();
})

const createCategore=asyncHandler(async(req,res,next)=>{
    const categore=await categoreModel.create(req.body)

    if(!categore){
        return next(new apiError("there is an error on creatign an categore",400));
    }
    res.status(200).json({status:"success",data:categore})
    
});

const getAllCategore=asyncHandler(async(req,res,next)=>{
    const categore=await categoreModel.find();
    if(!categore){
        return next(new apiError("there is no categore ",400));   
    }
    res.status(200).json({status:"success",length:categore.length,data:categore})
})

const getSpecificCategore=asyncHandler(async(req,res,next)=>{
    const categore=await categoreModel.findById(req.params.id)
    if(!categore){
        return next(new apiError(`there is no categore for this id ${req.params.id}`,400));
    }
    res.status(200).json({status:"success",data:categore})
})

const deleteCategore=asyncHandler(async(req,res,next)=>{
    const categore=await categoreModel.findByIdAndDelete(req.params.id)
    if(!categore){
        return next (new apiError(`there is no categore for this id ${req.params.id}`,400))
    }
    res.status(200).json({status:"success",message:`categore for this id ${req.params.id} is deleted `});
})  
const updateCategore=asyncHandler(async(req,res,next)=>{

    const categore=await categoreModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    
    if(!categore){
        return next(new apiError(`there is on categore for this id ${req.params.id}`,400));
    }
    categore.save();
    res.status(200).json({status:"cuccess",data:categore});

})

const getsubcategoreOfCategore=asyncHandler(async(req,res,next)=>{
        const data=await subcategoreModel.find({categore:req.params.id})
        
        if(!data){
            return next(new apiError(`there is no subcategore of this id ${req.params.id}`,400));
        }

        res.status(200).json({status:"success",data:data});

})


module.exports=  {createCategore,uploadImage,resizeImage,getAllCategore,getSpecificCategore,deleteCategore,updateCategore,getsubcategoreOfCategore}
