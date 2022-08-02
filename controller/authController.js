import User from "../model/User";
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'


// secret key
dotenv.config();
const SECRET = process.env.SECRET;


// Register User
const RegisterUser = async (req,res)=>{
    const {username,email,country,img,city,phone,password,isAdmin} = req.body;   
    try {
        if (email & password & username  == null ) {
            res.status(201).json({meassage:"Please fill up the form" });
            res.end();
        }
        const oldUser = await User.findOne({email})
        if (oldUser) {
            return res.status(400).json({meassage:"User alrady EXIST"})
        }
        const salt = await bcryptjs.genSalt(12);
        const hashedPassword = await bcryptjs.hash(password,salt);
        let data = {
            username:username,
            email:email,
            country:country || "BD",
            img:img || "custom image string",
            city:city || "DHAKA",
            phone:phone || "+880 184368759",
            password:hashedPassword,
            isAdmin:isAdmin || false,
            
         }
        const result = await User.create(data)
        const  token = jwt.sign({email: result.email,name: result.name,id:result._id,isAdmin:result.isAdmin},SECRET,{expiresIn:"15d"})
        res.cookie("access_token",token,{
            httpOnly:true,
            maxAge: 900000,
            secure:true
        }).status(200).json({meassage:"User creation done",result:result,token:token})
    } catch (error) {
        console.log(error);
        res.status(201).json({meassage:error})
    }
  
}
// LOGIN USER


const LOGINuser = async (req, res) => {
    const {email,password} = req.body; 
    try { 
        const oldUser = await User.findOne({email})
        if (!oldUser) {
            return res.status(400).json({meassage:"User Not found"})
        };
        const isMatch = await bcryptjs.compare(password,oldUser.password);
        
        if (!isMatch) {
            return res.status(504).json({meassage:"password is not correct"})
        };
        const token = jwt.sign({email:oldUser.email, id:oldUser._id,name:oldUser.name,isAdmin:oldUser.isAdmin},SECRET,{expiresIn:"15d"})
        res.cookie("access_token",token,{
            httpOnly:true,
            maxAge: 900000,
            secure:true
        }).status(200).json({meassage:"User login successfully",result:oldUser,token});        

    } catch (error) {
        console.log(error);
        res.status(500).json({meassage:error})
    }
}




export  {
 
    RegisterUser,
    LOGINuser,
    
}