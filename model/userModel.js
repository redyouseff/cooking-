const { Timestamp } = require("bson");
const { profile } = require("console");
const mongoose =require("mongoose");
const { type } = require("os");
const { boolean } = require("webidl-conversions");


const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },
    slug:{
        type:String,
        lowercase:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        lowercase:true
    },
    phone:{
        type:String,

    },
    profileImage:{
        type:String
    },
    password:{
        type:String,
        required:[true,"password id required "],
        minLength:[6,"too short password "]

        
    },
    role:{
        type:String,
        enum:["user","maker","deleviry","admin"],
        default:"user"
    },
    active:{
        type:String,
        default:true,
    },
    addresses:[{
        city:String,
        details:String,
        postaCode:String,
        phone:String
    }]

},{Timestamp:true})


const setImgageUrl=(doc)=>{
    if(doc.profileImage){
  
    
        const imageUrl=`${process.env.BASE_URL}/users/${doc.profileImage}`
        doc.profileImage=imageUrl;
    }
}
userSchema.post('init', function(doc) {
    
   
   setImgageUrl(doc);

  });

  userSchema.post('save', function(doc) {
   
    setImgageUrl(doc);
    
   });
const userModel=mongoose.model("user",userSchema);
module.exports=userModel