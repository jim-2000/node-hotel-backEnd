//models index
const Mongoose = require('../config/db').Mongoose,
    Schema = Mongoose.Schema;

const employeesSchema = new Schema({
    name: {
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
    email: {
        type: String,
        trim: true,
        required: true
    },
   
    password : {
        type : String,
        trim : true
    },
    isBlocked : {
        type : Boolean,
        default : false
    },
    role : {
        type : String,
        default : "employee"  // 1-Manager, 2-employee
    }
},{
    timestamps: true
});

const employees = Mongoose.model('employee', employeesSchema);
module.exports = employees;
