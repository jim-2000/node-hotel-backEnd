import express from 'express'
import Hotel from '../model/Hotel';
import {getAllHotel,CreateHotel,updateHotel,AHotel,DeleteHotel, AddExtraFitures,RemoveItemExtraFitures, countByCitys, countByType} from '../controller/hotelController'
// import { } from '../middleware/authMiddleware';
const router = express.Router();

/*
        // ---------HOTE CRUD
*/


//  CREATE
router.route("/").post(CreateHotel)
//  UPDATE
router.route("/:id").put(updateHotel) //verifyUser
//  DELETE
router.route("/:id").delete(DeleteHotel)
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
router.route('/add/extrafeture/:id').patch(AddExtraFitures);
// remove item from extra feacher
router.route('/remove/extrafeture/:id').patch(RemoveItemExtraFitures);


export default router;
 
 