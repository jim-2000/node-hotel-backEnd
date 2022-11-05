import express from 'express'
const router = express.Router();

// register 
router.route("/").get((req, res) => {
    //
    res.send("hello prisma")
});


export default router;