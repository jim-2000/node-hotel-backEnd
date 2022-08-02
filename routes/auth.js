import express from 'express'
import { LOGINuser, RegisterUser } from '../controller/authController';
const router = express.Router();

// 

// register 
router.route("/register").post(RegisterUser)
// login 
router.route("/login").post(LOGINuser)

export default router;
 
 