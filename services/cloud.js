import { v2 as cloudinary } from 'cloudinary';
// import  from 'dotenv'; 
import { nanoid } from 'nanoid';
 

 
var staticImage = "https://via.placeholder.com/728x90.png?text=Visit+tourpidea+term+conditione%20C/O%20https://placeholder.com/";
export const storeImage = async (file) => {
    if (file === undefined || file === null || file === "") {
      return staticImage;
    }else{
      try {
        const res = await cloudinary.uploader.upload(file,{
          folder:"auth", 
          public_id:nanoid(10),            
        });
        
      
        return res.secure_url;
      } catch (error) {
        return error;
      }
    }
  }

  //...........
  export const RemoveTourImage = async (public_id) =>{
    try {
      const res = await cloudinary.uploader.destroy(id,(public_id,r)=>{
        console.log(r);
      })
      console.log("remove cloudynary",res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
 