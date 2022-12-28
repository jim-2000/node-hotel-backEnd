import express from 'express'
import { Admin, AllUser, blockUser, deleteAllUser, deleteAUser, updateUser } from '../controller/auth/userController';
import { auth, isAdminVerify, isStuffORAdmin,  } from '../middleware/authMiddleware';
 
const router = express.Router();
// 
//  all user 
router.route("/").get(isAdminVerify,AllUser) // add token middleware
// delete all user 
router.route("/delete/all").get(isAdminVerify,deleteAllUser) // add admin token middleware
router.route("/delete/:id").get(deleteAUser) // add token middleware
// get admin
router.route("/admin").get(isStuffORAdmin,Admin) // add admin token middleware
// block user
router.route("/block/:id").get(blockUser) // add admin token middleware
// update user
router.route("/update/:id").put(updateUser) // add token middleware
export default router;
 
 