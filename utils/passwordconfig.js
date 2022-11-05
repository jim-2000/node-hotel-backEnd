import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config();
//
export const  genPassowrd = async (pass)=>{
    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(pass,salt);
    return hashedPassword;
}
//  comparePassword,
export const comparePassword = async (pass,oldpass)=>{
    const isMatch = await bcryptjs.compare(pass,oldpass);
    return isMatch;
}

