import mongoose from 'mongoose';
import Hotel from '../model/Hotel';

const projection = {
    password: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0
}

// Get all Hotel list
const getAllHotel = async (req,res)=>{
    const {min,max,...others} = req.query;
    try {
        const hottle = await Hotel.find({...others,cheapestPrice:{
            $gt:min ||1,
            $lt:max ||999,
        }}).limit(req.query.limit);
      
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
// add new image to hotel
const AddImage = async (id,images)=>{
   
    //
    try {           
      const Feacher = await Hotel.updateOne({_id:id},{
        $push:{
            photos:images
        }
      })
        return Feacher;
    } catch (error) {
        res.status(500).json(error);      
    }
}

// update Hotel
const updateHotel = async(req,res)=>{
    const {id} = req.params;
    const {photos} = req.body;
    //
    try {
        const UpdateHotel = await Hotel.findOneAndUpdate({_id:id},{
            $set:req.body,
        });
           if(photos){
            await AddImage(id,photos);
           }        
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

// query feachers by city
export const countByCitys = async (req,res)=>{
    const cities = req.query.cities.split(',');
    console.log(cities);
    //
    try {
        const list = await Promise.all(cities.map(async (city)=>{
            return Hotel.countDocuments({city:city})
        }))
        const result = await Promise.all(list);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);      
    }
}
// query feachers by type
export const countByType = async (req,res)=>{    
    //
    try {
        const hotelCount = await Hotel.countDocuments({type:"hotel"});
        const apartmentCount = await Hotel.countDocuments({type:"apartment"});
        const resortCount = await Hotel.countDocuments({type:"resort"});
        const villaCount = await Hotel.countDocuments({type:"villa"});
        const cabinCount = await Hotel.countDocuments({type:"cabin"});

        res.status(200).json([[
            {type:"hotel",count:hotelCount},
            {type:"apartment",count:apartmentCount},
            {type:"resort",count: resortCount},
            {type:"villa",count: villaCount},
            {type:"cabin",count: cabinCount}            
        ]]);
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