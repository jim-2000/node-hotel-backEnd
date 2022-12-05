import Employe  from '../model/employees'
import dotenv from 'dotenv'
import { sendError } from '../utils/errors/error'
import { genPassowrd ,comparePassword} from '../utils/passwordconfig';
import CreateJWT,{ VerifyJWT } from '../utils/CreateJWT';
import SendData from '../utils/responses/SendData';

// secret key
dotenv.config();
const SECRET = process.env.SECRET;

const projection = {
    password: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0
}

///-----------------------------------------------
export const signUpEmploye = async (req, res) => {
    const { name, email, password,phone,title } = req.body
     try {
        const oldEmploye = await Employe.findOne({ email })
        if (oldEmploye) return sendError('Employe already exists',res, 400)
        const pass = await genPassowrd(password);
        const data ={
            name,
            jobTitle: title,
            phone,
            image: 'https://via.placeholder.com/150',
            email,
            password: pass,
            
        }
        const newEmploye = await Employe.create(data)
        const token = await CreateJWT({email: newEmploye.email,id:newEmploye._id,role:newEmploye.role});
        return SendData(res,{meassage:"Employe Create Successfully",employe:newEmploye ,status:200,token},200)
     } catch (error) {
        console.log(error);
        return sendError("someThing is Wrong try again", res, 500)
     }
}
export const signInEmploye = async (req, res) => {
    const { email, password } = req.body
    try {
        const employe = await Employe.findOne({ email })
        if (!employe) return sendError('Employe not found',res, 400)
        const isMatch = comparePassword(password,employe.password);
        if (!isMatch) return sendError('Invalid password',res, 400)
        const token = await CreateJWT({email: employe.email,id:employe._id,role:employe.role});
        return SendData(res,{meassage:"Successfully LogIn", status:200,token},200)
    } catch (error) {   
        console.log(error);   
        return sendError("someThing is Wrong try again", res, 500)
    }
}
export const removeEmploye = async (req, res) => {
    const { id } = req.params
    try {
        const employe = await Employe.findByIdAndDelete(id)
        if (!employe) return sendError('Employe not found', res, 404)
        return SendData(res,{meassage:"Employe Deleted Successfully",employe, status:200},200)
    } catch (error) {
        console.log(error);
        return sendError("someThing is Wrong try again", res, 500)
    }
}
export const singelEmploye = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await Employe.findById(id)
        if (data == null) {
          return  sendError("User Not Found", res, 404)
        }else{
            return SendData(res,data,200)
        }

    } catch (error) {
        return sendError("someThing is Wrong try again", res, 500)        
    }
}
//
export const AllEmploye = async (req, res) => {
    try {
        const employe = await Employe.find({},projection)
        
            return SendData(res,employe,200)        

    } catch (error) {
        return sendError("someThing is Wrong try again", res, 500)        
    }
}
// active employe
export const activeEmploye = async (req, res) => {
    const { id } = req.params;
    try {
        const employe = await Employe.findByIdAndUpdate(id,{isActivate:true})
        if (!employe) return sendError('Employe not found', res, 404)
        return SendData(res,{meassage:"Employe Active Successfully",status:200},200)
    } catch (error) {
        console.log(error);
        return sendError("someThing is Wrong try again", res, 500)
    }
}
// deactive employe
export const deactiveEmploye = async (req, res) => {
    const { id } = req.params;
    try {
        const employe = await Employe.findByIdAndUpdate(id,{isActivate:false})
        if (!employe) return sendError('Employe not found', res, 404)
        return SendData(res,{meassage:"Employe Deactive Successfully",status:200},200)
    } catch (error) {
        console.log(error);
        return sendError("someThing is Wrong try again", res, 500)
    }
}
// get all active employe
export const activeEmployeList = async (req, res) => {
    try {
        const employe = await Employe.find({isActivate:true},projection)      
        return SendData(res,employe,200)        

    } catch (error) {
        console.log(error);
        return sendError(error, res, 500)        
    }
}

// get all deactive employe
export const deactiveEmployeList = async (req, res) => {
    try {
        const employe = await Employe.find({isActivate:false},projection)        
        return SendData(res,employe,200)        

    } catch (error) {
        return sendError("someThing is Wrong try again", res, 500)        
    }
}