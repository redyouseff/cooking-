const express=require("express")
const app =express();
const dotenv=require("dotenv");
const path = require("path");
const cors =require("cors");
const morgan = require("morgan");
const dbConnection = require("./config/dgConnection");
const globalError = require("./middleware/globalError");
const apiError = require("./utils/appiError");
const mainRoute = require("./routes/mainRoute");



dotenv.config({path:"config.env"})
app.use(express.static(path.join(__dirname,"uploads")))
app.use(express.json());
app.use(cors());
app.options("*",cors())


if(process.env.NODE_ENV=="development "){
    console.log(`mode is ${process.env.NODE_ENV}`)
    app.use(morgan("dev"))
}

const server=app.listen(process.env.PORT,()=>{
    console.log(`app listen on port ${process.env.PORT}`)
   

})

dbConnection();
mainRoute(app)

app.use("*",(req,res,next)=>{
    next(new apiError(`cant find this url ${req.originalUrl}`,400))
})

app.use(globalError)




process.on("unhandledRejection",(err)=>{
    console.log(`unhandledRejection error :${err}`)
    server.close(()=>{
        console.error("shutting down the server ")
        process.exit(1)
    })
})