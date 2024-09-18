const mongoose=require("mongoose");

const mealSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        required:[true,"user is required "],
        ref:"users"
    },
    name:{
        type:String,
        min:[3,"too short name"],
        required:[true,"name of the meal is required"],
        unique:true,
    },
    description:{
        type:String,
        required:[true,"the description is required "],
        min:[5,"too short decription"]
    },
    price:{
        type:Number,
        required:[true,"the price is required"]
    },
    discount:{
        type:String
    },
    ingredients:{
        type:String,
    },

    prep_time:{
        type:String
    },
    image:{
        type:String
    },
    meal_type:{
        type:String
    }


})

const setImgageUrl=(doc)=>{
    if(doc.image){
      
        const imageUrl=`${process.env.BASE_URL}/meals/${doc.image}`
        doc.image=imageUrl;
    }
}
mealSchema.post('init', function(doc) {
    
   
   setImgageUrl(doc);

  });

  mealSchema.post('save', function(doc) {
   
    setImgageUrl(doc);
    
   });

const mealModel=mongoose.model("meal",mealSchema)

module.exports=mealModel