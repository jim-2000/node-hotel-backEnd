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
import upload from "../cloudController";
import Hotel from "../../model/Hotel";
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
            // generate otp]
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


// Create new  Hotel

export const CreateHotel = async ( req,res )=>{
    const {name,description,type,city,address,lat,long,photos,cheapestPrice,faq,nearby} = req.body;
     try {
        let newphotos = [];
        const user = await User.findOne({email:req.user.email,role:"admin"});
        if (!user) {
            return SendData(res,{
                meassage:"User not found",
                status:404,
            },404);
        }
        if (photos && photos.length >0) {
            const imgs = await upload.MultiImage(photos)            
            const result = await Promise.all([imgs]);
            newphotos=result[0];
        }else{
            newphotos=[];
        }
        // const distroy = await upload.destroy('AHAY6jXF5Go7E2SR0p343')
        const data ={
            owner: req.userId,
            name:name,
            description:description,
            type:type,
            city:city,
            address:address,
            lat:lat,
            long:long,
            photos:newphotos,
            cheapestPrice:cheapestPrice,
            faq:faq,
            nearby:nearby,            
        }      
        
        const newHotel = await Hotel.create(data);
        const savedHotel = await newHotel.save();
        res.status(200).json({
            status:200,
            data:savedHotel,
            meassage:'successfully created your Hotel',
        });         
        // res.status(200).json(data);
     } catch (error) {
        console.log(error);
        res.status(500).json(error);
     }
}