import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
    // hotel identification=============
    isActive:{
        type: Boolean,
        default: true,
    },
    isPrimary:{
        type: Boolean,
        default: false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId, // user id
        ref:'User',
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String, // 1-hotel, 2-motel, 3-resort, 4-hostel, 5-guesthouse
        default: '1',
    },
    city: {
        type: String,
    },
    address: {
        type: String,
    },
    lat: {
        type: String,
    },
    long: {
        type: String,
    },
    photos:[
        {
            publicId: {type: String, required: true,},
            url: { type: String, required: true },
        },
    ],
      
    // hotel room details================
    rooms: {
        type: [
            mongoose.Schema.Types.ObjectId,
        ],
        ref: "Room",        
    },
    cheapestPrice: {
        type: Number,
        default: 20, // count in dollars
    },

    //  Hotel surroundings================
    nearby: [
        {
            name: {type: String, required: true,},
            distance: { type: String, required: true },
        },
    ],  
    // hotel  details==============   
    facilities: [
        {
            name: { type: String, required: true, trim: true},
            description: { type: [String], required: true, trim: true},
            icon:{type: String,}
        }
    ],
    // hotel policies
    checkIn: {
        type: String,
        default:'12 AM',
    },
    checkOut: {
        type: String,
        default:'12 AM',
        // required: true,
    },
 
   
    // Other section
    faq: [
        {
            question: { type: String, required: true, trim: true},
            answer: { type: String, required: true, trim: true}
        }
    ],
    review:[
        {
            id:{
                type: mongoose.Schema.ObjectId, required: true,
                trim: true, ref: 'User' 
            },
            name: {
                 type: String,
            }, 
            description: { 
                type: String, required: true, trim: true
            }        
        }
    ],
    // web data
    slider:[
        {
            img:{
                type: String,                
            },
            title: {
                 type: String,
            }, 
            description: { 
                type: String, required: true, trim: true
            }        
        }
    ],
    // rating
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
})

export default mongoose.model("Hotel",HotelSchema);