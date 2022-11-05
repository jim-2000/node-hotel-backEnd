import User from "../../model/User";
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'
import CreateJWT from "../../utils/CreateJWT";
import SendData, { SendCookieData } from "../../utils/responses/SendData";
import { validateSignUp } from "../../validations/signupValidation";
import {  sendError } from "../../utils/errors/error";
import { comparePassword, genPassowrd } from "../../utils/passwordconfig";
import moment from "moment/moment";
import SendEmail from "../../config/EmailConfig";
import {SignUpTemplate} from "../../utils/mail/signupmail.js";

// secret key
dotenv.config();
const SECRET = process.env.SECRET;

const projection = {
    password: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0
}

// Register User
const RegisterUser = async (req,res)=>{

    try {        
        const {username,email,img,phone,password} = req.body;  
        // check if user already exist
        const oldUser = await User.findOne({email})
        if (oldUser) {
           return  sendErrorProd("User alrady EXist",res,400);
        }
        const pass = await genPassowrd(password);
          // generate otp
        const Otp = Math.floor(100000 + Math.random() * 900000);
        const OtpExpire = moment().add(10, "minutes");
        let data = {
            username:username,
            email:email,         
            img:img,          
            phone:phone || "+880 184368759",
            password:pass,
            otp:Otp,
            otpExpire:OtpExpire                 
        }
        //
        const result = await User.create(data)     
        const token = await CreateJWT({email: result.email,name: result.username,id:result._id,isVerified:result.isVerified});
        //
      return  SendCookieData(res,{meassage:"User created successfully Now You Need to verify your account ",user: result,token}, "access_token", token,{
            httpOnly:true,
            maxAge: 900000,
            secure:true            
        });      
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
        const isMatch = await comparePassword(password,oldUser.password);
        
        if (!isMatch) {
            return res.status(504).json({meassage:"password is not correct"})
        };         
        if(oldUser.isBlocked == true){
            return res.status(400).json({meassage:"You are blocked please contact with customer support"})       
        }
        const token = CreateJWT({email:oldUser.email, id:oldUser._id,name:oldUser.username,isVerified:oldUser.isVerified});
      
         return  SendCookieData(res,{meassage:"User login successfully",user: oldUser,token}, "access_token", token,{
            httpOnly:true,
            maxAge: 900000,
            secure:true            
        });       

    } catch (error) {
        console.log(error);
        res.status(500).json({meassage:error})
    }
}


//  otp verify
export const otpVerify = async (req, res) => {
    const {email,otp} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({meassage:"User Not found"})
        };
        if (user.otp == otp) {
            if (moment().isAfter(user.otpExpire,"seconds")) {
                return sendError("Otp Expired",res,400);
            }else{
                user.isVerified = true;
                user.otp = null;
                user.otpExpire = null;
                await user.save();
                return SendData(res,{meassage:"OTP is verified successfully",user:user})
            }
        }else{
            return sendError("OTP is not correct",res,400);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({meassage:error})
    }
};

// resend otp
export const resendOtp = async (req, res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({meassage:"User Not found"})
        };
        const Otp = Math.floor(100000 + Math.random() * 900000);
        const OtpExpire = moment().add(10, "minutes");
        user.otp = Otp;
        user.otpExpire = OtpExpire;
        await user.save();
        await SendEmail(
              email,
              `Email verification code: ${Otp}`,
              SignUpTemplate(Otp, `${email} ${''}`)
            );
        return res.status(200).json({meassage:"OTP resend successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({meassage:error})
    }
};



export  { 
    RegisterUser,
    LOGINuser,
}