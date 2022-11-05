import Hotel from "../model/Hotel";
import Room from "../model/Room";

// Get all Room list
export const getAllRoom = async (req,res)=>{
    try {
        const rooms = await Room.find({});
        res.status(200).json({msg:"All Room",result:rooms});
    } catch (error) {
        res.status(500).json({msg:"something is wrong"});
        
    }
}

export const createRoom = async (req,res)=>{
    const {id} = req.params;
    console.log(id);
    const  newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(id,{$push:{rooms:savedRoom._id}});
        } catch (error) {
            res.status(500).json({msg:"Error in updating hotel",err:error});
        }
        res.status(200).json({msg:"Roome create successfully",result:savedRoom});

    } catch (error) {
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
      res.status(200).json({msg:"Get a single room",result:room}); 
        
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
        res.status(200).json({msg:"Room is delete successfully",result:room});      
      }
      res.status(200).json({msg:"Not Found",result:room}); 
        
    } catch (error) {
        res.status(500).json({msg:"Something is wrong try again ",err:error});    
        
    }
}