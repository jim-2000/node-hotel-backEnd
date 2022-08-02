import Hotel from "../model/Hotel";
import Room from "../model/Room";

// Get all Room list
export const getAllRoom = async (req,res)=>{
    try {
        const rooms = await Room.find({});
        res.status(200).json({msg:"All Hotels",result:rooms});
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
        const hotelbyroom = await Hotel.findById(id).populate("rooms");
        const rooms = hotelbyroom.rooms;
        const roomlist = [];
       rooms.forEach(room => {
           Room.findById(room).then(room => {
                roomlist.push(room);
                console.log(room);             
            }).catch(err => {
                console.log(err);
            })
            
        })
        res.status(200).json({msg:"Rooms by hotel",result:[room]});                
    } catch (error) {
        res.status(500).json(error);        
    }
}

// update Room
export const updateRoom = async(req,res)=>{
    const {id} = req.params;
    //
    try {
        const UpdateRoom = await Room.findOneAndUpdate(id,{
            $set:req.body
        })
        res.status(200).json(UpdateRoom);
        
    } catch (error) {
        res.status(500).json(error);        
    }
}

// get a singel Room
export const ARoom = async (req,res)=>{
    const {id} =req.params;
    console.log(id);
    //
    try {
      const Room = await Room.findById(id)
      res.status(200).json(Room);
        
    } catch (error) {
        res.status(500).json(error);      
        
    }
}
// delete a singel Room
export const DeleteRoom = async (req,res)=>{
    const {id} =req.params;
    console.log(id);
    //
    try {
      const Room = await Room.findByIdAndDelete(id)
      res.status(200).json(Room);
        
    } catch (error) {
        res.status(500).json(error);      
        
    }
}