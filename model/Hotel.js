import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
    // hotel identification=============
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
        required: true, 
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
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
        required: true,
    },
    //  Hotel surroundings================
    nearby: [
        {
            name: {type: String, required: true,},
            distance: { type: String, required: true },
        },
    ],
    restaurantsAndCafe: [
        {
            resturantType: {
                type: Number, // 1-restaurant, 2-cafe
                default: 1,
            }, // 1-restaurant, 2-cafe/bar
            name: {type: String, required: true,},
            distance: { type: String, required: true },
            description: { type: String, required: true },
        },
    ],
    Beaches:[
        {
            name: {type: String, required: true,},
            distance: { type: String, required: true },
        },
    ],
    closestAirport:[
        {
            name: {type: String, required: true,},
            distance: { type: String, required: true },
        },
    ],
    // hotel  details==============
    popularfacilities: {
        type: [String],
        min: 1,
    },
    Services: {
        type: [String],
        min: 1,
    },
    facilities: [
        {
            name: { type: String, required: true, trim: true},
            description: { type: [String], required: true, trim: true}
        }
    ],
    // hotel policies
    checkIn: {
        type: String,
        required: true,
    },
    checkOut: {
        type: String,
        required: true,
    },
    cancellation: {
        type: String,
    },
    payment: {
        type: String,
    },
    childrenAndBed: {
        type: String,
    },
    pets: {
        type: String,
    },
    cashOnly:{
        type: String,
    },
    // faq section
    faq: [
        {
            question: { type: String, required: true, trim: true},
            answer: { type: String, required: true, trim: true}
        }
    ],
    //comments
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