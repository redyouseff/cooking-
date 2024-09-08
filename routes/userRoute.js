const express =require("express");
const { createUser,getSpecificUser,getAllUsers,deleteUser,uploadImage,resizeImage,updateLoggedUser,deleteLoggedUser } = require("../services/userService");
const { protect,allowedTo } = require("../services/authService");
const router=express.Router();



router.route("/").post(uploadImage,resizeImage,createUser).get(protect,allowedTo("admin"),getAllUsers)
router.route("/:id").get(getSpecificUser).delete(deleteUser)
router.route("/updateLoggedUser").put(protect,updateLoggedUser)
router.route("/deleteLoggedUser").put(protect,deleteLoggedUser)


module.exports=router