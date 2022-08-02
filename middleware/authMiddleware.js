import jwt from 'jsonwebtoken';
import { createError } from '../utils/error';

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



export const isAdminVerify = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if (req.user.isAdmin) {
            next();      
        }else{
            return next(createError(404,"You are not authorized as a admin"))
        }
    });
}


export const verifyUser = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();      
        }else{
            return next(createError(404,"You are not authorized"))
        }
    });
}