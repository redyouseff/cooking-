const userRouter=require("./userRoute.js")
const authRouter=require("./authRoute")
const mealRouter=require("./mealRoute.js")
const categoreRoute=require("./categoreRoute.js")
const subcategoreRoute=require("./subcategoreRoute")
const menuRoute=require("./menuRoute.js")

const mainRoute=(app)=>{
    app.use("/user",userRouter)
    app.use("/auth",authRouter)
    app.use("/meal",mealRouter)
    app.use("/categore",categoreRoute)
    app.use("/subcategore",subcategoreRoute)
    app.use("/menu",menuRoute)



}

module.exports =mainRoute