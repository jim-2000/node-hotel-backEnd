
//models index
import mongoose from "mongoose";


const Employe = new mongoose.Schema(
{
    name: {
        type: String,
        trim: true,
        required: true
    },
    jobTitle:{
        type: String,
        trim: true,
        required: true        
    },
    phone: {
        type: String,
        required: true
    },
    image: {
        type : String,
        default: ''
    },
    sallary: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },   
    password : {
        type : String,
        trim : true,
        required:true,
    },     
    isActivate:{
        type : Boolean,
        default : false
    }, 
    role : {
        type : String,        
        enum: {
            values: [
                'user',
                'admin',
                'employee',
            ],
        },
        default : "employee"  // 1-Manager, 2-employee
    }
},{
    timestamps: true
});

export default mongoose.model('Employe', Employe);
