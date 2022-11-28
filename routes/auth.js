import express from 'express'
import { forgotPassword, LOGINuser, otpVerify, RegisterUser, resendOtp, resetPassword } from '../controller/auth/authController';
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
// otp verification
router.route("/otpVerify").post(otpVerify);
// forgot password
router.route("/forgotPassword").post(forgotPassword);
// reset password
router.route("/resetPassword").post(resetPassword);


export default router;
 
 