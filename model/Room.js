import mongoose from "mongoose";
const RoomSchema = new mongoose.Schema(
  {
   
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
    },
    img: [String],
    maxPeople: {
      type: Number,
      required: true,
    },
    roomNumber: [
        {
            number:Number,
            unavailbleDates:{type:Date,default:[]},
        }
    ],
   
    
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);