import dotenv from 'dotenv'
import mongoose from 'mongoose'

const DbConnect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Db Connected");
    } catch (error) {   
        console.log("Error in db connect",error);
    }
}
export default DbConnect;
