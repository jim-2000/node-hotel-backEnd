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
  
    },
    unAvailableDates: [
      {
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          required: true,
        },
        bookedBy: {
          type: mongoose.Schema.Types.ObjectId,
        }, 
      }
    ],
    roomType: {
      type: Number, // 0 for single, 1 for double, 2 for family
      default: 0, //
    },
    price:{
      type:Number,
      required: true,
    },
    maxGuests: {
      type: Number,
      default: 2,
    },
    img: [
      {
        publicId: {type: String, required: true,},
        url: { type: String, required: true },
      }
    ],
      
    size: {
      type: Number,
      default: 1200,
    },    
    totalBed: {
      type:Number,      
      default:1
    },
    BedroomType: {
      type: String,
      enum: {
          values: [
              'Single',
              'Double',
              'King',
          ],
          default: 'Single',
      }      
    },
    roomFeature:[
      {
          name: { type: String, required: true, trim: true},
          description: { type: String, required: true, trim: true},    
          icon: { type: String,trim: true}      
      }
    ],    
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);