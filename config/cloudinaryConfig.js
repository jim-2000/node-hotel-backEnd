import {config} from 'cloudinary'

const cloudinaryConfig = (req,res,) => {
  config({
  cloud_name: "the-captaion", 
  api_key: "715335848874361", 
  api_secret: "Tf91_RtpDcfkRbMpira_fFGEOio",
  secure: true,   
  });
 
}
  module.exports ={cloudinaryConfig}