import * as Cloudinary from 'cloudinary'

  const CloudData= (req,res,) => {
    Cloudinary.v2.config({
  cloud_name: "the-captaion", 
  api_key: "715335848874361", 
  api_secret: "Tf91_RtpDcfkRbMpira_fFGEOio",
  secure: true,   
  }); 
}

export default CloudData;
 