import express from 'express'
import { Admin, AllUser, blockUser, deleteAllUser, deleteAUser } from '../controller/auth/userController';
import { isAdminVerify, verifyToken, verifyUser } from '../middleware/authMiddleware';
 
const router = express.Router();

// 

//  all user 
router.route("/").get( AllUser) // add token middleware
// delete all user 
router.route("/delete/all").get( deleteAllUser) // add admin token middleware
router.route("/delete/:id").get( deleteAUser) // add token middleware
// get admin
router.route("/admin").get(Admin) // add admin token middleware
// block user
router.route("/block/:id").get(blockUser) // add admin token middleware
export default router;
 
 