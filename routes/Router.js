import { Router } from 'express';
import authRoute from './auth.js';
import hottleRoute from './hotels.js';
import roomsRoute from './rooms.js';
import usersRoute from './users.js';
import employeRoute from './employe'
import adminRoute from './admin.js'
const router = Router();

router.use("/auth",authRoute);
router.use("/users",usersRoute);
router.use("/hottle",hottleRoute);
router.use("/rooms",roomsRoute);
router.use("/employe",employeRoute);
router.use("/admin",adminRoute);

export default router;