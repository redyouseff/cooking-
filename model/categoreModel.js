const mongoose=require("mongoose");

categoreSchema=new mongoose.Schema({
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
        image:{
            type:String
        }
},{timestamps:true})

setImageUrl=(doc)=>{
    if(doc.image){
        const imageUrl=`${process.env.BASE_URL}/categores/${doc.image}`
        doc.image=imageUrl
    }

}

categoreSchema.post("init",function(doc){
    setImageUrl(doc)
})


categoreSchema.post('save', function(doc) {
                        
    setImageUrl(doc);
    
   });



 const  categoreModel=new mongoose.model("categore",categoreSchema)
 module.exports=categoreModel