const express=require('express')
const router=express.Router();
const  {createCategore,uploadImage,resizeImage,getAllCategore,getSpecificCategore,deleteCategore,updateCategore} =require("../services/categoreService");
const { protect, allowedTo } = require('../services/authService');

router.route("/").post(uploadImage,resizeImage ,protect,allowedTo("admin"),createCategore)

.get(protect,getAllCategore);
;

router.route("/:id").get(protect,getSpecificCategore)
.delete(protect,allowedTo("admin"),deleteCategore)
.put(protect,allowedTo("admin"),updateCategore)




module.exports=router;



