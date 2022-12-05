import User from "../../model/User";
import bcryptjs from 'bcryptjs'
import Joi from "joi";
import dotenv from 'dotenv'
import CreateJWT from "../../utils/CreateJWT";
import SendData, { SendCookieData } from "../../utils/responses/SendData";
import { validateSignUp } from "../../validations/signupValidation";
import {  createError, sendError, sendErrorDev, sendUserCreateError } from "../../utils/errors/error";
import { comparePassword, genPassowrd } from "../../utils/passwordconfig";
import moment from "moment/moment";
import SendEmail from "../../config/EmailConfig";
import {SignUpTemplate} from "../../utils/mail/signupmail.js";
import { genOtp } from "../../utils/otpConfig";
import { sendOTpPhoneMsg } from "../../utils/responses/SendPhoneOTP";


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
export const RegisterUser = async (req,res)=>{  
     try {        
        const {username,email,img,phone,password} = req.body;  
        // check if user already exist
        const oldUser = await User.findOne({email})
        if (oldUser) {
           return  SendData(res,{
            meassage:"User already exist",
            status:422,
        },422); 
        }
        const pass = await genPassowrd(password);
          // generate otp
        const Otp = genOtp();
        let data = {
            username:username,
            email:email,         
            img:img,          
            phone:phone,
            password:pass,
            otp:Otp.Otp,
            otpExpire:Otp.OtpExpire                 
        }
        //
        const result = await User.create(data)  
        await SendEmail(
            email,
            `Email verification code: ${Otp}`,
            SignUpTemplate(Otp, `${email} ${''}`)
          );
        const token = await CreateJWT({email: result.email,id:result._id,isVerified:result.isVerified,role:result.role});
        //
        return SendData(res,{meassage:"User created successfully Now You Need to verify your account",user: result,status:200,token},200)
         
    } catch (error) {
        return SendData(res,{
            meassage:"Something went wrong",
            status:502,
        },502); 
    }
  
}
// LOGIN USER


export const LOGINuser = async (req, res) => {
    const {email,password} = req.body; 
    try { 
        const oldUser = await User.findOne({email})
        if (!oldUser) {             
            return SendData(res,{
                meassage:"User not found",
                status:404,
            },404); 
        };
        const isMatch = await comparePassword(password,oldUser.password);
        
        if (!isMatch) {
            return SendData(res,{
                meassage:"Password is not correct",
                status:401,
            },401); 
        };         
        if(oldUser.isBlocked == true){           
            return SendData(res,{
                meassage:"You are blocked please contact with customer support",
                status:422,
            },422);    
        }        
        if(oldUser.isVerified == false){
                // generate otp
            const Otp = Math.floor(100000 + Math.random() * 900000);
            const OtpExpire = moment().add(10, "minutes");
            oldUser.otp = Otp;
            oldUser.otpExpire = OtpExpire;  
            await oldUser.save();
            await SendEmail(
                email,
                `Email verification code: ${Otp}`,
                SignUpTemplate(Otp, `${email} ${''}`)
              );
            return SendData(res,{
                meassage:"You need to verify your account",
                status:401,
            },401);
        }
        // token
        const token = CreateJWT({email:oldUser.email, id:oldUser._id,name:oldUser.username,isVerified:oldUser.isVerified});
      
        return SendData(res,{
            meassage:"User Login successfully",
            user: oldUser,token
            },200
        )       

    } catch (error) {
        return SendData(res,{
            meassage:"Something went wrong",
            status:502,
        },502);
    }
}

// 8TO7g93jkaWz30IHPNiz0YnwL93AW18cYxCSJWeu
//  otp verify
export const otpVerify = async (req, res) => {
    const {email,otp} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return sendError("User not found", res,404); 
        };
        if (user.otp == otp) {
            if (moment().isAfter(user.otpExpire,"seconds")) {
                return sendError("Otp Expired",res,500);
            }else{
                user.isVerified = true;
                user.otp = null;
                user.otpExpire = null;
                await user.save();
                return SendData(res,{meassage:"OTP is verified successfully",status:200},200);
            }
        }else{
            return sendError("OTP is not correct",res,501);
        }
    } catch (error) {
        return SendData(res,{
            meassage:"Something went wrong",
            status:502,
        },502);
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
        const Otp = genOtp();
        user.otp = Otp.Otp;
        user.otpExpire =Otp.OtpExpire;

        await user.save();
        await SendEmail(
              email,
              `Email verification code: ${Otp.Otp}`,
              SignUpTemplate(Otp.Otp, `${email} ${''}`)
            );
        return res.status(200).json({meassage:"OTP resend successfully"})
    } catch (error) {
        return SendData(res,{
            meassage:"Something went wrong",
            status:502,
        },502);
    }
};

// forgot password
export const forgotPassword = async (req, res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
       
        if (!user) {
            return sendError("User not found",res,404);
        }
        const Otp = genOtp();
        user.otp = Otp.Otp;
        user.otpExpire =Otp.OtpExpire;
        await user.save();
        await SendEmail(
            email,
            `Email verification code: ${Otp.Otp}`,
            SignUpTemplate(Otp.Otp, `${email} ${''}`)
        );
        return SendData(res,{
            meassage:"OTP resend successfully",
            status:200,
        },200);
     
    } catch (error) {
        return sendError(res,{
            meassage:"Something went wrong",
            status:502,
        },502);
    }
};
// reset password
export const resetPassword = async (req, res) => {
    const {email,otp,password} = req.body;    
    try {
        const user = await User.findOne({email});
        if (!user) {
            return sendError("User Not Found",res,404);
        }
        if (user.otp == otp) {
            if (moment().isAfter(user.otpExpire,"seconds")) {
                return sendError("Otp Expired",res,500);
            }else{
                const pass = await genPassowrd(password);
                user.password = pass;
                user.otp = null;
                user.otpExpire = null;
                await user.save();
                return SendData(res,{message:"Password reset successfully",status:200},200)
            }
        } else {
            return sendError("OTP is not correct",res,400);
        }
    } catch (error) {
        return sendError({
            meassage:"Something went wrong",          
        },res,502);
    }
};

// phone number verify
export const phoneVerify = async (req, res) => {
    const {phone} = req.body;
    // const {email} = req.user;
    try {
        const user = await User.findOne({phone});
        if (!user) {
            return SendData(res,{
                meassage:"User not found",
                status:404,
            },404); 
        }

        const otp = await genOtp();
        user.otp = otp.Otp;
        user.otpExpire = otp.OtpExpire;
        await user.save();
        await sendOTpPhoneMsg(phone,otp.Otp);
        return SendData(res,{
            meassage:"OTP send successfully to your phone number",
            status:200,
        },200); 


    } catch (error) {
        console.log(error);
        return SendData(res,{
            meassage:"Something went wrong",
            status:502,
        },502);
    }
}

// change password
export const changePassword =  async( req,res)=>{
    const {newPassword,password , email}= req.body; // this email came from req.user but now just try catch  
    try {
        const user = await User.findOne({email});
        if (!user) {
            return sendError("User Not Found",res,404);
        }
        const isMatch = await comparePassword(password,user.password);        
        if (!isMatch) {
            return sendError("Password Not Match Try with currect password",res,404); 
        };         
        if(user.isVerified == false){   
            const otp = genOtp();
            user.otp = otp.Otp;
            user.otpExpire = otp.OtpExpire;
            await user.save();
            await SendEmail(
                email,
                `Email verification code: ${otp.Otp}`,
                SignUpTemplate(otp.Otp, `${email} ${''}`)
              );
            return sendError("Please verify your account we sent otp code in your mail",res,400)   
        } 
        const isOldPassword = await comparePassword(newPassword,user.password);
        if (isOldPassword) {
            return sendError("You can't use same password",res,400);
        }       
        const newpass = await genPassowrd(newPassword);
            user.password = newpass;            
            await user.save();
            return SendData(res,{message:"Password Chagne successfully",status:200},200)
    } catch (error) {
        sendError("Something is Wrong",res,501);
    }
}
 