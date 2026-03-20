import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connect.DB.js'
import userRouter from './route/user.route.js'
import errorHandler from './middleware/error.middleware.js'

dotenv.config()
const app = express()

app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URL
}));
app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy:false
}))
const PORT=8080||process.env.PORT

app.get("/login",(req,res)=>{
    res.json({
        message : "server is runnig "  + PORT
    })
})

app.use("/api/users",userRouter)
app.use(errorHandler);
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("server is running",PORT)
    })
}) 



 