const mongoose=require("mongoose")

const menuSchema=new mongoose.Schema({
    name:{
        type:String,
        maxLength:[30,"to much name character"],
        minLength:[2,"too short name"],
        required:[true,"name is required"]
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"users",
        required:[true,"user is required"],        
    },
    meals:{
        type:[mongoose.Schema.ObjectId],
        ref:"meal",
        required:[true,"meal is required"]
    }

})


 
const menuModel=new mongoose.model("menu",menuSchema)

module.exports=menuModel;

