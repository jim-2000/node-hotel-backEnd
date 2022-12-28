import express from "express"
import path from 'path'
import dotenv from "dotenv" 
import DbConnect from "./db/DbConnect.js";
import cors from 'cors'
 
import morgan from "morgan";
import cookieParser  from 'cookie-parser' 
import  AppRoute from "./routes/Router.js";
const app = express()
dotenv.config();
//
const port = process.env.PORT || 4000;

// config yarn add body-parser
app.use(express.static('public'))
app.use(cookieParser())
app.use(cors())
app.use(morgan("dev"))
app.use(express.json({limit:"200mb", extended:true}))
app.use(express.urlencoded({ limit:"30mb", extended:true}));

// middlewares
app.use("/api",AppRoute)
app.get('/', (req, res)=>{
    res.sendFile(path.resolve('public/wellcome.html'));
}) // well come html page
 

// app initialization
const Start = async ()=>{   
    try {
        await DbConnect();
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    } catch (error) {
        console.log(error)
    }
}
 


// mainfunctions
Start();












//