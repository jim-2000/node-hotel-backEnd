import express from 'express'
import { changePassword, forgotPassword, LOGINuser, otpVerify, phoneVerify, RegisterUser, resendOtp, resetPassword } from '../controller/auth/authController';
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
//
router.route("/phoneVerify").post(phoneVerify);
// 
router.route("/changePassword").post(changePassword);

export default router;
 
 