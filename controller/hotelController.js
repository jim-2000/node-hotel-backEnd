import mongoose from 'mongoose';
import Hotel from '../model/Hotel';
import upload from './cloudController'
import SendData from '../utils/responses/SendData';
const projection = {
    password: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0
}

// Get all Hotel list
const getAllHotel = async (req,res)=>{
    // const {min,max,...others} = req.query;
    try {
        const hotel = await Hotel.find({},projection);    
        res.status(200).json({msg:"All Hotels",result:hotel});              
        
    } catch (error) {
        res.status(500).json({msg:"something is wrong"});
        
    }
}
 
 
 
// update Hotel
const updateHotel = async(req,res)=>{
    const {id} = req.params;
    const {name,description,type,city,address,lat,long} = req.body;     
    //
   
    try {     
        if (name && description && type && city && address && lat && long ==null) {
            return SendData(res,"Blank field not updated",404);
        }    
        const updateHotel = await Hotel.updateOne({owner:req.userId},{
            $set:{
                name:name,
                description:description,
                type:type,
                city:city,
                address:address,
                lat:lat,
                long:long
            },
            
        },{
            upsert:true,
        })        
 
        return  res.status(200).json('Successfully Update Data');     
    } catch (error) {
        console.log(error);
        res.status(500).json(error);        
    }
}

// get a singel Hotel
export const OwnerHotel = async (req,res)=>{  
    //
    try {
      const hotel = await Hotel.findOne({isPrimary:true})
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

// create primary hotel
const CreatePrimaryHotel = async (req,res)=>{
    const {id} = req.params;
    
    try{
        const isAvailable = await Hotel.findOne({isPrimary:true})
        const Hotel = await Hotel.findByIdAndUpdate(id,{isPrimary:true},{new:false})               
        if(isAvailable){
            return SendData(res,`${isAvailable.name} is Now On Primary You can't add Multiple Hotel as a Primary Hotel unless set this secondary`,200);            
        }
    }catch(error){

    }
    
}







// Add Hotel ========Extra Feachers =====

const AddSingelImage = async (req,res)=>{
    const {id} = req.params;
    const {image} = req.body;

    try{
        let file;
        if (image) {
           file = await upload.SinglEimage(image)
        }
        const hotel = await Hotel.findByIdAndUpdate(id,{
            $push:{
                photos:file
            }
        },{new:true})
        if(hotel){
            return SendData(res,`Image added `,200);
        }
    }catch(error){
        console.log(error);
        return SendData(res,error.message,200);
    }
}



const AddExtraFitures = async (req,res)=>{
    const {id} = req.params;
    const {name,distance} = req.body;
    //
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No Hotel exist with This id: ${id}` });
        }
        let ficher = {
            name:name,
            distance:distance
        }
        const UpdateHotel = await Hotel.updateOne({_id:id},{
            $push:{nearby:ficher}
        });      
        res.status(200).json('Successfully added');
    } catch (error) {
        res.status(500).json(error);      
    }
}

// remove extra Feachers =====

const RemoveItemExtraFitures = async (req,res)=>{
    const {id} = req.params;
    const {nId} = req.body;
    console.log(nId);
    //
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No Hotel exist with This id: ${id}` });
        }       
      const Feacher = await Hotel.updateOne({_id:id},{
        $pull:{
            nearby:{
                _id:nId
            }
        }
      })
    res.status(200).json('Successfully Removed');
    } catch (error) {
        res.status(500).json(error);      
    }
}

// add faq

export const AddFaq = async (req,res)=>{
    const {id} = req.params;
    const {answer,question} = req.body;
    //
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No Hotel exist with This id: ${id}` });
        }       
        let faq = {
            question:question,
            answer:answer
        }
        const UpdateHotel = await Hotel.updateOne({_id:id},{
            $push:{faq:faq}
        },)
        res.status(200).json('New FAQ Added Successfully');
    } catch (error) {
        res.status(500).json(error);
    }    

}
// remove faq


export const RemoveItemFaq = async (req,res)=>{
    const {id} = req.params;
    const {eId} = req.body;
    console.log(eId);
    //
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No Hotel exist with This id: ${id}` });
        }       
     
        const UpdateHotel = await Hotel.updateOne({_id:id},{
            $pull:{
                faq:{
                    _id:eId
                }                
            }
        },)
        res.status(200).json('FAQ Removed Successfully');

    } catch (error) {
        res.status(500).json(error);
    }    

}

// remove images

export const RemoveItemImages = async (req,res)=>{
    const {id} = req.params;
    const {_id,publicId} = req.body;
    console.log(req.body);
    //
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No Hotel exist with This id: ${id}` });
        }
        const destroy = await upload.destroy(publicId);
        Promise.all([destroy]);        
        const UpdateHotel = await Hotel.updateOne({_id:id},{
            $pull:{
                photos:{
                    _id:_id
                }
            }
        })
        res.status(500).json("Successfully Removed");
    }catch(error) {
        res.status(500).json("Something went wrong");

    }
}

export const AddItemImages = async (req,res) =>{
    const {id} =req.params;
    const {file} = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No Hotel exist with This id: ${id}` });
        }
        const photo = await upload.SinglEimage(file)
        Promise.all([photo]);        
        const UpdateHotel = await Hotel.updateOne({_id:id},{
            $push:{
                photos:photo
            }
        })
        res.status(200).json('Image Added Successfully');
    } catch (error) {
        res.status(500).json("Something is wrong")
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

export const uploadSingelImage = async (req,res)=>{
    const {img} = req.body;
 
    let imgurlList =[];
    //
    try {
        const imgs = upload.MultiImage(img)
        const result = await Promise.all([imgs]);
        
        imgurlList.push(...result,result.url);        
        res.status(200).json(imgurlList);      
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}
//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
export{
getAllHotel,
updateHotel,
DeleteHotel,
AddExtraFitures,
RemoveItemExtraFitures
}