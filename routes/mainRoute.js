const userRouter=require("./userRoute.js")
const authRouter=require("./authRoute")

const mainRoute=(app)=>{
    app.use("/user",userRouter)
    app.use("/auth",authRouter)



}

module.exports =mainRoute