import User from "../../model/User";

import dotenv from 'dotenv'
import SendData from "../../utils/responses/SendData";
import { sendError } from "../../utils/errors/error";


const projection = {
  password: 0,
  createdAt: 0,
  updatedAt: 0,
  __v: 0
}


// DELETE A USER
const deleteAUser = async (req,res)=>{
    const {id} =req.params;
    try {
      const user = await User.findByIdAndDelete(id)
      return SendData(res,{meassage:"User deleted",result:user},200);       
    } catch (error) {
      res.status(500).json(error);
    }
}


// DELETE ALL USER 
const deleteAllUser  = async (req,res)=>{
  try {
    const deleteUser = await User.remove();
    SendData(res,{meassage:"All user deleted",result:deleteUser},200);
  } catch (error) {
    res.status(500).json(error);       
  }
}

// get all user 
const AllUser  = async (req,res)=>{
  try {
    // console.log(req.user, req.userId);
    const user = await User.find({isAdmin:false},projection);
    // res.json({meassage:"Users",result:user,totalUser:user.length});
    res.json(user);
  } catch (error) {
    res.status(500).json(error);      
  }
}
//
const Admin  = async (req,res)=>{
  try {
    const user = await User.find({role:'admin'});
    res.json({meassage:"Users",result:user,totalUser:user.length});
  } catch (error) {
    res.status(500).json(error);      
  }
}
// bloc a user
const blockUser = async (req,res)=>{
  const {id} = req.params;
  try {
    User.findByIdAndUpdate(id,{isBlocked:true},(err,doc)=>{
      if (err) {
        res.status(500).json(err);
      }
      SendData(res,{meassage:"User blocked",result:doc},200);
    })
  } catch (error) {
    
  }
}
// update a user
const updateUser = async (req,res)=>{
  const {id} = req.params;
  try {
    User.findByIdAndUpdate(id,req.body, ).then((doc)=>{
      if (!doc) {
        return res.status(400).json({meassage:"User Not found"})
      }
      return SendData(res,{
        meassage:"User Update successfully",
        },200)  
    })
  } catch (error) {
    return sendError(res,{
        meassage:"Something went wrong",
        status:502,
    },502);
  }
}

export  {
    AllUser,
    Admin,
    deleteAllUser,
    deleteAUser,
    blockUser,
    updateUser
}