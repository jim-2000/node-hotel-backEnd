import express from 'express'
import Hotel from '../model/Hotel';
import {getAllHotel,CreateHotel,updateHotel,AHotel,DeleteHotel, AddExtraFitures,RemoveItemExtraFitures, countByCitys, countByType} from '../controller/hotelController'
import { isAdminVerify, verifyUser } from '../middleware/authMiddleware';
const router = express.Router();

/*
        // ---------HOTE CRUD
*/


//  CREATE
router.route("/").post(CreateHotel)
//  UPDATE
router.route("/:id").put(verifyUser,updateHotel)
//  DELETE
router.route("/:id").delete(verifyUser,DeleteHotel)
//  GET
router.route("/find/:id").get(AHotel)
//  GET ALL
router.route("/").get(getAllHotel)
//  count by citys
router.route("/counByCity").get(countByCitys)
//  count by type
router.route("/countByType").get(countByType)



/*
        // ---------EXTRA FEACHER OF A HOTEL 
*/


// add hotel ====== Extra feacher ====
router.route('/add/extrafeture/:id').patch(verifyUser, AddExtraFitures);
// remove item from extra feacher
router.route('/remove/extrafeture/:id').patch(verifyUser,RemoveItemExtraFitures);


export default router;
 
 