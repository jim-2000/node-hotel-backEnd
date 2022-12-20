import User from "../../model/User";
 
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
dotenv.config();
const SECRET = process.env.JWT_SECRET;
const EXPIRE = process.env.JWT_EXPIRES_IN
//
export const createAdmin = async (req,res)=>{  
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
                otpExpire:Otp.OtpExpire,
                role:'admin'                 
            }
            //
            const result = await User.create(data)  
            await SendEmail(
                email,
                `Email verification code: ${Otp}`,
                SignUpTemplate(Otp, `${email} ${''}`)
              );
            const token = CreateJWT({email: result.email,id:result._id,isVerified:result.isVerified,role:result.role});
            //
            return SendData(res,{meassage:"User created successfully Now You Need to verify your account",user: result,status:200,token},200)
    } catch (error) {
        return sendError(res,{
            meassage:"Something went wrong",
            status:502,
        },502);
    }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ldG9sYWc4ODRAbHViZGUuY29tIiwiaWQiOiI2MzlmZmQxZTg0ZGQxZjYxYzkyZjVmZjgiLCJpc1ZlcmlmaWVkIjpmYWxzZSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjcxNDI5NDExLCJleHAiOjE2NzIyOTM0MTF9.bpljyaOrrGD7aohwrAJhkpCM774VgayTYJvGXrsHvVI

// LOGIN USER
export const LOGINadmin = async (req, res) => {
    const {email,password} = req.body; 
    try { 
        const oldUser = await User.findOne({email,role:"admin"});
        if (!oldUser) {             
            return SendData(res,{
                meassage:"User not found",
                status:404,
            },404); 
        };
        if(oldUser.role !== "admin") {
            return SendData(res,{
                meassage:"User is not admin",
                status:403,
            },403);
        }
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
                const Otp = genOtp();
            oldUser.otp = Otp.Otp;
            oldUser.otpExpire = Otp.OtpExpire;  
            await oldUser.save();
            await SendEmail(
                email,
                `Email verification code: ${Otp.Otp}`,
                SignUpTemplate(Otp.Otp, `${email} ${''}`)
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

export const RemoveAdmin = async (req,res) => {
    const {email} = req.body; 
    console.log(req.user);
    try { 
        const user = await User.findOne({email,role:"admin"});
        if (!user) {             
            return SendData(res,{
                meassage:"User not found",
                status:404,           
            },404);
        }
        if(user.role!== "admin") {
            return SendData(res,{
                meassage:"User is not admin",
                status:403,
            },403);
        }
        await user.remove();
        return SendData(res,{
            meassage:"User successfully removed",
            status:200,
            },200);
    }catch (error) {
        return SendData(res,{
            meassage:"Something went wrong",
            status:502,
        },502);
    }
}