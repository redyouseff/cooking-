const express=require("express");
const router=express.Router();
const {createMenu,updateMenu,deleteMenu,getLoggedUserMenu,getSpecificMenu,getAllMenu} =require("../services/menuService");
const { protect, allowedTo } = require("../services/authService");
const { route } = require("./categoreRoute");

router.route("/").post(protect,createMenu)
.get(getAllMenu)

router.route("/loggedUserMenu").get(protect,allowedTo("user"),getLoggedUserMenu)

router.route("/:id").get(getSpecificMenu)
.put(protect,allowedTo("user"), updateMenu)
.delete(protect,allowedTo("user"), deleteMenu)





module.exports=router;

