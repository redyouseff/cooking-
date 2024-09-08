const multer=require("multer");
const apiError = require("../utils/appiError");

const multerOptions=()=>{
    const multerStorage=multer.memoryStorage();
    const multerFilter=(req,file,cb)=>{
        if(file.mimetype.startsWith("image")){
            cb(null,true)
        }
        else{
            cb(new apiError("only image is allowed",400),false)
        }

    }
    const upload=multer({multer:multerStorage,fileFilter:multerFilter})
    return upload;
}
const uploadSingleImage=(fileName)=>{
    return multerOptions().single(`${fileName}`)
}
const uploadMixedImage=(arrayOfField)=>{
    return  multerOptions().fields(arrayOfField)
}

module.exports={uploadMixedImage,uploadSingleImage}