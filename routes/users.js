import express from 'express'
import { AllUser, deleteAllUser, deleteAUser } from '../controller/userController';
import { isAdminVerify, verifyToken, verifyUser } from '../middleware/authMiddleware';
 
const router = express.Router();

// 

//  all user 
router.route("/").get( AllUser) // add token middleware
// delete all user 
router.route("/delete/all").get(isAdminVerify, deleteAllUser) // add admin token middleware
router.route("/delete/:id").get(verifyUser,deleteAUser) // add token middleware

export default router;
 
 