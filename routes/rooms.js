import express from 'express'
import { createRoom,  getAllRoom,  getRoomsByHottle } from '../controller/roomController';
const router = express.Router();

// get rooms by hotel id
router.route("/").get(getAllRoom);
// create a new room
router.route("new/room/:id").post(createRoom);
// GET ROOM BY HOTTLE ID
router.route("/hottle/:id").get(getRoomsByHottle)

export default router;
 
 