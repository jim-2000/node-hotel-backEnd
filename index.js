import express from "express"
import dotenv from "dotenv"
import DbConnect from "./db/DbConnect.js";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import hottleRoute from "./routes/hotels"
import roomsRoute from "./routes/rooms"
import usersRoute from "./routes/users.js"
import cors from 'cors'
import morgan from "morgan";
import cookieParser  from 'cookie-parser' 
//
const app = express()
dotenv.config();
const port = 3000 || process.env.PORT

// config
app.use(cookieParser())
app.use(cors())
app.use(morgan("dev"))
app.use(express.json({limit:"200mb", extended:true}))
app.use(express.urlencoded({ limit:"30mb", extended:true}));

// middlewares
app.use("/auth",authRoute);
app.use("/users",usersRoute);
app.use("/hottle",hottleRoute);
app.use("/rooms",roomsRoute);

// app initialization
const Start = async ()=>{   
    DbConnect();
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}
mongoose.connection.on("disconnected",()=>{
    console.log("DB disconnectd");
})

mongoose.connection.on("connected",()=>{
    console.log("DB re connectd");
})

// routes
app.get('/', (req, res) => res.send('Hello World!'))


// mainfunctions
Start();












//