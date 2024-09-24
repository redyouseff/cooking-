const express=require("express");
const router=express.Router();
const {createMenu}=require("../services/menuService");
const { protect, allowedTo } = require("../services/authService");

router.route("/").post(protect,createMenu)

module.exports=router;

