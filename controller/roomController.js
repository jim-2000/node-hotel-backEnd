import Hotel from "../model/Hotel";
import Room from "../model/Room";
import Booking from "../model/boked";
import {format } from 'date-fns'
import upload from "./cloudController";

const projection = {
    password: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0
}
// Get all Room list
export const getAllRoom = async (req,res)=>{
    try {
        const rooms = await Room.find({});
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({msg:"something is wrong"});
        
    }
}

export const createRoom = async (req,res)=>{
    const {title,description,roomNumber,roomType,price,maxGuests,img,roomFeature} = req.body;
    try {
        let newphotos = [];

        if (img && img.length >0) {
            const imgs = await upload.MultiImage(img)            
            const result = await Promise.all([imgs]);
            newphotos=result[0];
        }else{
            newphotos=[];
        }
        const data = {
            title: title,
            description: description,
            roomNumber: roomNumber,
            roomType: roomType,
            price: price,
            maxGuests: maxGuests,  
            img:newphotos,      
            roomFeature:roomFeature,
        }
        const newroom  = await Room.create(data);
        return res.status(201).json(newroom);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Error in createing room",err:error});        
    }
}

// get rooms by hotel id
export const getRoomsByHottle = async (req,res)=>{
    const {id} = req.params;  
    try {
        const hotelbyroom = await Hotel.findById(id);      
        const listrooms = await Promise.all(hotelbyroom.rooms.map(async (room)=>{
            const roombyid = await Room.findById(room);
            return roombyid;
        }));
        res.status(200).json({msg:"Rooms by hotel",result:listrooms,total:listrooms.length});
    } catch (error) {
        res.status(500).json({msg:"Something is wrong try again ",err:error});       
    }
}

// update Room
export const updateRoom = async(req,res)=>{
    const {id} = req.params;
    console.log(req.body.img);
    //
    try {
        const UpdateRoom = await Room.findOneAndUpdate(id,{$set:req.body},{new:true});
        res.status(200).json({msg:"Room is update succesfully",result:UpdateRoom}); 
        
    } catch (error) {
        res.status(500).json({msg:"Something is wrong try again ",err:error});      
    }
}

// get a singel Room
export const ARoom = async (req,res)=>{
    const {id} =req.params;
    console.log(id);
    //
    try {
      const room = await Room.findById(id)
      res.status(200).json(room);         
    } catch (error) {
        res.status(500).json({msg:"Something is wrong try again ",err:error});    
        
    }
}
// delete a singel Room
export const DeleteRoom = async (req,res)=>{
    const {id} =req.params;
    console.log(id);
    //
    try {
      const room = await Room.findByIdAndDelete(id)
      if (room) {
       return res.status(200).json("Room is delete successfully");      
      }else{
          return res.status(200).json( "Not Found" ); 
      }        
    } catch (error) {
        console.log(error);
       return res.status(500).json("Something is wrong try again ");    
        
    }
}

// chek room avaliblity
export const checkRoomAvaliblity = async (req,res)=>{
    const {id} = req.params;
    const {startDate,endDate} = req.body;
    console.log(startDate,endDate);
    //
    try {
        const room = await Room.findById(id);
        const unAvailableDates = room.unAvailableDates;
        const isAvailable = unAvailableDates.every((date)=>{
            return (startDate < date.startDate && endDate < date.startDate) || (startDate > date.endDate && endDate > date.endDate);
        });
        if (isAvailable) {
            res.status(200).json({msg:"Room is available",result:room});
        }else{
            res.status(200).json({msg:"Room is not available",result:room});
        }
    } catch (error) {
        res.status(500).json({msg:"Something is wrong try again ",err:error});    
    }
}
// book room
export const bookRoom = async (req,res)=>{
    const {id} = req.params;
    const {startDate,endDate} = req.body;
    //
    if (startDate && endDate) {          
    try {
        const checkIn = format(new Date(startDate), 'yyyy-MM-dd');
        const checkOut = format(new Date(endDate), 'yyyy-MM-dd');
        console.log(checkIn,checkOut);
        const room = await Room.findById(id);
        const unAvailableDates = room.unAvailableDates;
        const isAvailable = await Room.findOne().where('unAvailableDates').elemMatch({startDate:{$lte:checkIn},endDate:{$gte:checkOut}}).countDocuments();
        console.log(isAvailable);
        // const isAvailable = unAvailableDates.every((date)=>{
        //     return (checkIn < date.startDate && checkOut < date.startDate) || (checkIn > date.endDate && checkOut > date.endDate);
        // });
        if (isAvailable == 0 ) {
             await room.updateOne(
                {$push:{unAvailableDates:{startDate:checkIn,endDate:checkOut}}}
                );
                const updatedRoom =   await room.save();
            //     const newBooking = await Booking.create({startDate,endDate,room:id ,bookedBy:'60e1f1b1b1b1b1b1b1b1b1b1'});
            res.status(200).json({msg:"Room is booked",result: updatedRoom});
        }else{
            res.status(400).json({msg:"Room is not available"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Something is wrong try again ",err:error});    
    }
}else{
    res.status(200).json({msg:"Please provide start and end date"});
}

}
// remove booking
export const removeBooking = async (req,res)=>{
    const {id} = req.params;
    const {startDate,endDate} = req.body;
    //
    if (startDate && endDate) {          
    try {
        const checkIn = format(new Date(startDate), 'yyyy-MM-dd');
        const checkOut = format(new Date(endDate), 'yyyy-MM-dd');
        console.log(checkIn,checkOut);
        const room = await Room.findById(id);
        const unAvailableDates = room.unAvailableDates;
        const isAvailable = await Room.findOne().where('unAvailableDates').elemMatch({startDate:checkIn,endDate:checkOut});
        console.log(isAvailable);
        // const isAvailable = unAvailableDates.every((date)=>{
        //     return (checkIn < date.startDate && checkOut < date.startDate) || (checkIn > date.endDate && checkOut > date.endDate);
        // });
            if (isAvailable) {
                await room.updateOne(
                    {
                        $pull:{
                            unAvailableDates:{startDate:checkIn,endDate:checkOut}
                        }
                    }
                );
                const updatedRoom =     await room.save();
                //     const newBooking = await Booking.create({startDate,endDate,room:id ,bookedBy:'60e1f1b1b1b1b1b1b1b1b1b1'});
                res.status(200).json({msg:"Your Booking is canceled",result: updatedRoom});
            }else{
                res.status(400).json({msg:"We can't find your booking"});
            }
        } catch (error) {
                console.log(error);
                res.status(500).json({msg:"Something is wrong try again ",err:error});    
        }
        }else{
            res.status(200).json({msg:"Please provide start and end date"});
        }
}    
