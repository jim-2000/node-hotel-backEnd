import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    hotelId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userName:{
        type:String,
    },
    start: {
        type:Date,
        required:true,        
    },
    end: {
        type:Date,
        required:true,   
        message: 'End date must be after start date'
    },
    phone:{
        type:String,
    },
    message:{
        type:String,
    },
    // number of day 
    totalDay: Number,
    totalAmount: Number,
    referAgent: String,

    // payment site
    paid: {
        type:Boolean,
        default:false        
    },
    coopone: String,
    paymentId: String,
    paymentType: {
        type: String,
        required: [true, 'Please Select your Payment Type'],
        enum: {
            values: [
                'Cash',
                'Card',
                'Paypal',
            ],
            message: 'Please select correct category for room'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Booking", bookingSchema);