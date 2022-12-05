import moment from "moment";
import  { customAlphabet, nanoid } from "nanoid";  

//
export const genOtp =   ( ) => {
    const Otp = Math.floor(100000 + Math.random() * 900000);
    const OtpExpire = moment().add(15,"minutes");
    return {Otp,OtpExpire};
}

 
 