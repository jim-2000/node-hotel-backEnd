import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';
import { createError, sendError } from '../utils/errors/error';
import SendData from '../utils/responses/SendData';
import User from '../model/User';
import { VerifyJWT } from '../utils/CreateJWT';
// secret key
dotenv.config();
const SECRET = process.env.SECRET;


 
export const verifyToken = (req,res,next)=>{
    //
    const token = req.cookies.access_token;

    console.log(token);
    if (!token) {
        return res.status(404).json("You are not authenticate")
    }
    jwt.verify(token,process.env.SECRET,(err,user)=>{
        if (err) {
            return next(createError(404,"Token is Not Valid"))
        }
        req.user=user;
        next();
    });
}

 






export const isEmployeVerify = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if (req.user.role == "admin" || req.user.role == "employe") {
            next();      
        }else{
            return next(createError(404,"You are not authorized as a admin"))
        }
    });
}
export const auth = async (req,res,next)=>{
    var token;
    const {authorization} = req.headers;    
    if(req.headers.authorization) { 
        token = authorization.split(' ')[1];   
        try {             
            let decodedData;          
                decodedData =   VerifyJWT(token)
                req.userId = decodedData?.id;         
                req.user=decodedData;                  
                next()                                
        } catch (error) {
            console.log(error);           
            sendError("Something is wrong",res,404)                           
        }       
    }else{
        sendError("You are not authenticate",res,404)  
    }
}

export const isAdminVerify = (req,res,next)=>{
    let token;
    const {authorization} = req.headers;
    if(req.headers.authorization) { 
        token = authorization.split(' ')[1];
        try {             
            let decodedData;          
                decodedData =   VerifyJWT(token)           
                if (decodedData.role === 'admin') {
                    console.log(decodedData);
                    next()                                
                }else{                
                    sendError("You are not authorized as a admin",res,500)
                }                          
        } catch (error) {
            console.log(error);           
            sendError("Something is wrong",res,404)                          
        }
    }else{
        sendError("Please login",res,404)
    }
}

export const isStuffORAdmin = (req,res,next)=>{
    let token;
    const {authorization} = req.headers;
    if(req.headers.authorization) { 
        token = authorization.split(' ')[1];
        try {             
            let decodedData;          
                decodedData =   VerifyJWT(token)           
                if (decodedData.role !== 'user') {
                    console.log(decodedData);
                    next()                                
                }else{                
                    sendError("You are not authorized as a admin",res,500)
                }                          
        } catch (error) {
            console.log(error);           
            sendError("Something is wrong",res,404)                          
        }
    }else{
        sendError("Please Login First",res,404)                          
    }
    

}