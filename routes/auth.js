import express from 'express'
import { LOGINuser, RegisterUser, resendOtp } from '../controller/auth/authController';
import { celebrate } from 'celebrate';
import { validateLogin, validateSignUp } from '../validations/signupValidation';
const router = express.Router();

// 

// register 
router.route("/register").post([
    celebrate(validateSignUp)
],RegisterUser);
// login 
router.route("/login").post([
    celebrate(validateLogin)
],LOGINuser);
// resend otp
router.route("/resendOtp").post(resendOtp);

export default router;
 
 