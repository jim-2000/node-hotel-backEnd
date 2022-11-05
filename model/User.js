import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
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
    reset_link: {
      type: String,
      null: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);