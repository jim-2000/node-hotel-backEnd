import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
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
    bookedBy: {
        type:String, // user id               
    },
    totalDay: Number,
    totalAmount: Number,
    paid: {
        type:Boolean,
        default:false        
    },
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