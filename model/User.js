import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required:[
        true,
        "Email should be unique "
      ],
    },   
    img: {
      type: String,
      default: "https://via.placeholder.com/150",
    },   
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,         
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,      
    },
    otp: {
      type: Number,
      null: true,       
    },
    otpExpire: {
      type: Date,
      null: true,       
    },
    phoneVerify:{
      default:false,
    },
    country:{
      type:String,
      default:"BD",
    },
    role : {
      type : String,        
      enum: {
          values: [
              'user',
              'admin',
              'employee',
          ],
      },
      default : "user"  // 1-Manager, 2-employee
  }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);