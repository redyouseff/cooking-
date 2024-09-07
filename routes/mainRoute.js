const userRouter=require("./userRoute.js")

const mainRoute=(app)=>{
    app.use("/user",userRouter)


}

module.exports =mainRoute