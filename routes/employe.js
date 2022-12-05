import express from 'express'
import { activeEmploye, activeEmployeList, AllEmploye, deactiveEmploye, deactiveEmployeList, removeEmploye, signInEmploye, signUpEmploye, singelEmploye } from '../controller/employeController';
 
 
const router = express.Router();

//
router.route("/").get( AllEmploye) // add token middleware
// add employe
router.route("/add").post(signUpEmploye) // add token middleware
// login employe
router.route("/login").post(signInEmploye) // add token middleware
// singel employe
router.route("/:id").get(singelEmploye) // add token middleware
//
router.route("/active/:id").get(activeEmploye) // add token middleware
router.route("/deactive/:id").get(deactiveEmploye) // add token middleware
// remove employe
router.route("/remove/:id").get(removeEmploye) // add token middleware

// active employe list
router.route("/all/active").get(activeEmployeList) // add token middleware
router.route("/all/deactive").get(deactiveEmployeList) // add token middleware


export default router;