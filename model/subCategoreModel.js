const mongoose =require("mongoose")
const subcategoreSchema= new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:[true,"name is required"],
        maxLength:[30,"to mach charcter"],
        minLength:[2,"to short charcter"],

    },
    slug:{
        type:String,
        lowercase:true
    },
    categore:{
        type:mongoose.Schema.ObjectId,
        required:[true,"categore is required"],
    }
})

const subcategoreModel=new mongoose.model("subcategore",subcategoreSchema);
module.exports=subcategoreModel;