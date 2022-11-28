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
      
    },
    price:{
        type:Number,
      required: true,

    },
    maxGuests: {
      type: Number,
      default: 2,
    },
    img: [String],
    maxPeople: {
      type: Number,
      required: true,
    },   
    size: {
      type: Number,
    },    
    totalBed: {
      type:Number,      
      default:1

    },
    BedroomType: {
      type: String,
      required: [true, 'Please a Bed Type'],
      enum: {
          values: [
              'Single',
              'Double',
              'King',
          ],
          message: 'Please select correct category for room'
      }      
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