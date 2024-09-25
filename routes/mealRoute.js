const express=require("express")
const router=express.Router();
const {creatMeal,uploadImage,resizeImage,getSpesificMeal,getAllMeal,deleteMeal,updateMeal,getLoggedUserMeals}= require("../services/mealService");
const { protect, allowedTo } = require("../services/authService");




router.route("/").post(uploadImage,resizeImage,protect,creatMeal).get(getAllMeal)
router.route("/user").get(protect,allowedTo("maker"),getLoggedUserMeals);

router.route("/:id").get(getSpesificMeal).delete(protect,allowedTo("admin","maker"),deleteMeal)
.put(protect,allowedTo("admin","maker"),updateMeal)


module.exports=router
