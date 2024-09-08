const express =require("express");
const router =express.Router();
const {signup,resizeImage,uploadImage,login}=require("../services/authService");
const { route } = require("./userRoute");
 
router.route("/signup").post(uploadImage,resizeImage,signup)
router.route("/login").post(login);








module.exports=router