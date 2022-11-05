import express from 'express'
import { ARoom, createRoom,  DeleteRoom,  getAllRoom,  getRoomsByHottle, updateRoom } from '../controller/roomController';
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

export default router;
 
 