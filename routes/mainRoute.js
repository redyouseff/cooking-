const userRouter=require("./userRoute.js")
const authRouter=require("./authRoute")
const mealRouter=require("./mealRoute.js")

const mainRoute=(app)=>{
    app.use("/user",userRouter)
    app.use("/auth",authRouter)
    app.use("/meal",mealRouter)



}

module.exports =mainRoute