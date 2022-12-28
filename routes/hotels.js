import express from 'express'
import Hotel from '../model/Hotel';
import {getAllHotel,updateHotel,DeleteHotel, AddExtraFitures,RemoveItemExtraFitures, countByCitys, countByType, uploadSingelImage, OwnerHotel, RemoveItemFaq, AddFaq, RemoveItemImages, AddItemImages} from '../controller/hotelController'
import { auth, isAdminVerify, isStuffORAdmin } from '../middleware/authMiddleware';
// import { } from '../middleware/authMiddleware';
const router = express.Router();

/*
        // ---------HOTE CRUD
*/

router.route('/img').patch(uploadSingelImage);
//  CREATE
// router.route("/").post(CreateHotel)
//  UPDATE
router.route("/update/").patch(isAdminVerify,updateHotel) //verifyUser
//  DELETE
router.route("/:id").delete(DeleteHotel)
//  GET
router.route("/myHotel/").get(isAdminVerify,OwnerHotel)
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
router.route('/add/nearby/:id').patch(auth,AddExtraFitures);
// remove item from extra feacher
router.route('/remove/nearby/:id').patch(auth,RemoveItemExtraFitures);

// add faq
router.route('/add/faq/:id').patch(auth, AddFaq);
router.route('/remove/faq/:id').patch(auth,RemoveItemFaq);
// add and remove images
router.route('/add/img/:id').patch(auth, AddItemImages);
router.route('/remove/img/:id').patch(auth,RemoveItemImages);


/*
        // ---------HOTE CRUD
*/

export default router;
 
 