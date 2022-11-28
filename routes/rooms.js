import express from 'express'
import { getAllBooking } from '../controller/bookingController';
import { ARoom, bookRoom, createRoom,  DeleteRoom, 
     getAllRoom,  getRoomsByHottle, removeBooking, updateRoom }
      from '../controller/roomController';
const router = express.Router();

// get rooms by hotel id
router.route("/").get(getAllRoom);
// create a new room
router.route("/new/:id").post(createRoom);
// update Room
router.route("/:id").put(updateRoom);
// get a singel Room
router.route("/:id").get(ARoom);
// delete a room
router.route("/:id").delete(DeleteRoom);
// GET ROOM BY HOTTLE ID
router.route("/hottle/:id").get(getRoomsByHottle)

// book Room
router.route("/book/:id").post(bookRoom);
// remove booking
router.route("/book/remove/:id").delete(removeBooking);
// get all book
router.route("/book/all").get(getAllBooking);
export default router;
 
 