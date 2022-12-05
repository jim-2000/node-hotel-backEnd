import Booking from '../model/boked.js';

const projection = {
    password: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0
}
//
export const getAllBooking = async (req,res)=>{
    try {
        const book = await Booking.find({});
        res.status(200).json({msg:"All Booking",result:book});
    } catch (error) {
        res.status(500).json({msg:"something is wrong"});        
    }
}

// create booking 