import express from "express"
import dotenv from "dotenv"
import DbConnect from "./db/DbConnect.js";
import cors from 'cors'
import morgan from "morgan";
import cookieParser  from 'cookie-parser' 
import  AppRoute from "./routes/Router.js";
//
const app = express()
dotenv.config();
const port = 4000 || process.env.PORT

// config
app.use(cookieParser())
app.use(cors())
app.use(morgan("dev"))
app.use(express.json({limit:"200mb", extended:true}))
app.use(express.urlencoded({ limit:"30mb", extended:true}));

// middlewares
app.use("/api",AppRoute)
 

// app initialization
const Start = async ()=>{   
    DbConnect();
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}
// mongoose.connection.on("disconnected",()=>{
//     console.log("DB disconnectd");
// })

// mongoose.connection.on("connected",()=>{
//     console.log("DB re connectd");
// })

// routes
app.get('/', (req, res) => res.send('Hello World!'))


// mainfunctions
Start();












//