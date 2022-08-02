import mongoose from 'mongoose';
import Hotel from '../model/Hotel';


// Get all Hotel list
const getAllHotel = async (req,res)=>{
    try {
        const hottle = await Hotel.find({});
        res.status(200).json({msg:"All Hotels",result:hottle});
    } catch (error) {
        res.status(500).json({msg:"something is wrong"});
        
    }
}
// Create new  Hotel

const CreateHotel = async ( req,res )=>{
    const newHotel = new Hotel(req.body);
    console.log(req.body);
     try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
     } catch (error) {
        res.status(500).json(error);
     }
}

// update Hotel
const updateHotel = async(req,res)=>{
    const {id} = req.params;
    //
    try {
        const UpdateHotel = await Hotel.findOneAndUpdate(id,{
            $set:req.body
        })
        res.status(200).json(UpdateHotel);
        
    } catch (error) {
        res.status(500).json(error);        
    }
}

// get a singel Hotel
const AHotel = async (req,res)=>{
    const {id} =req.params;
    console.log(id);
    //
    try {
      const hotel = await Hotel.findById(id)
      res.status(200).json(hotel);
        
    } catch (error) {
        res.status(500).json(error);      
        
    }
}
// get a singel Hotel
const DeleteHotel = async (req,res)=>{
    const {id} =req.params;
    console.log(id);
    //
    try {
      const hotel = await Hotel.findByIdAndDelete(id)
      res.status(200).json(hotel);
        
    } catch (error) {
        res.status(500).json(error);      
        
    }
}



// Add Hotel ========Extra Feachers =====

const AddExtraFitures = async (req,res)=>{
    const {id} = req.params;
    const {name,description} = req.body;
    //
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No Hotel exist with This id: ${id}` });
        }
        let Fitures = {
            name:name,
            description:description
        }
        const UpdateHotel = await Hotel.updateOne({_id:id},{
            $push:{extrafeature:Fitures}
        });      
        res.status(200).json(UpdateHotel);
    } catch (error) {
        res.status(500).json(error);      
    }
}

// Add Hotel ========Extra Feachers =====

const RemoveItemExtraFitures = async (req,res)=>{
    const {id} = req.params;
    const {eId} = req.body;
    console.log(id);
    //
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No Hotel exist with This id: ${id}` });
        }       
      const Feacher = await Hotel.updateOne({_id:id},{
        $pull:{
            extrafeature:{
                _id:eId
            }
        }
      }) 
 

        res.status(200).json(Feacher);
    } catch (error) {
        res.status(500).json(error);      
    }
}



export{
getAllHotel,
CreateHotel,
updateHotel,
AHotel,
DeleteHotel,
AddExtraFitures,
RemoveItemExtraFitures
}