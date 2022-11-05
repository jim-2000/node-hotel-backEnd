import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    start: Date,
    end: Date
});

export default mongoose.model("Booking", bookingSchema);