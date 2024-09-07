const express =require("express");
const { createUser,getSpecificUser,getAllUsers,deleteUser } = require("../services/userService");
const router=express.Router();


router.route("/").post(createUser).get(getAllUsers)
router.route("/:id").get(getSpecificUser).delete(deleteUser)


module.exports=router