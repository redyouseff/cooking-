const express =require("express");

const router=express.Router();
const {updataSubcategore,deleteSubcategore,getSpesificSubcategore,getAllSubcategore,createSubcategore} =require("../services/subcategoreService");
const { route } = require("./mealRoute");

router.route("/").get(getAllSubcategore)
.post(createSubcategore)


router.route("/:id").get(getSpesificSubcategore)
.put(updataSubcategore)
.delete(deleteSubcategore)





module.exports=router