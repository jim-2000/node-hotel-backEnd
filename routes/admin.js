import express from 'express'
import { celebrate } from 'celebrate';
import { CreateHotel, LOGINadmin, RemoveAdmin, createAdmin } from '../controller/auth/adminController';
import { validateLogin, validateSignUp } from '../validations/signupValidation';
import { auth, isAdminVerify, verifyToken } from '../middleware/authMiddleware';
 
const router = express.Router();

router.route('/').post([   
        celebrate(validateSignUp)   
],createAdmin)
router.route('/login').post([   
        celebrate(validateLogin)   
],LOGINadmin)
router.route('/remove').post(auth,RemoveAdmin)
router.route('/create_hotel').post(isAdminVerify,CreateHotel)

export default router;

