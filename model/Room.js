import mongoose from "mongoose";
const RoomSchema = new mongoose.Schema(
  {   
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
      required: true,

    },
    roomNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    roomType: {
      type: Number, // 0 for single, 1 for double, 2 for family
    },
    price:{
        type:Number,
      required: true,

    },
    img: [String],
    maxPeople: {
      type: Number,
      required: true,
    },   
    size: {
      type: Number,
    },
    
    Bedroom: {
      type: String,
    },  
    wifi:{
      type:Boolean,
      default:true,
    } ,
    roomFeature:[
      {
          name: { type: String, required: true, trim: true},
          description: { type: String, required: true, trim: true}        
      }
    ],    
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);