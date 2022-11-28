import { Router } from 'express';
import authRoute from './auth.js';
import hottleRoute from './hotels.js';
import roomsRoute from './rooms.js';
import usersRoute from './users.js';
const router = Router();

router.use("/auth",authRoute);
router.use("/users",usersRoute);
router.use("/hottle",hottleRoute);
router.use("/rooms",roomsRoute);

export default router;