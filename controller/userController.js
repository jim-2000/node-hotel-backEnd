import User from "../model/User";

import dotenv from 'dotenv'


// secret key
dotenv.config();
const SECRET = process.env.SECRET;




// DELETE A USER
const deleteAUser = async (req,res)=>{
    const {id} =req.params;
    try {
      const user = await User.findByIdAndDelete(id)
      res.status(200).json(user);        
    } catch (error) {
        res.status(500).json(error);   
    }
}


// DELETE ALL USER 
const deleteAllUser  = async (req,res)=>{
  try {
    const deleteUser = await User.remove();
      res.json({meassage:"User delete done",result:deleteUser})
  } catch (error) {
    res.status(500).json(error);       
  }
}

// get all user 
const AllUser  = async (req,res)=>{
  try {
    const user = await User.find({isAdmin:false});
    res.json({meassage:"Users",result:user,totalUser:user.length});
  } catch (error) {
    res.status(500).json(error);      
  }
}


export  {
    AllUser,
 
    deleteAllUser,
    deleteAUser
}