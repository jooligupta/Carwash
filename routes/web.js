const express = require("express");
const router = express.Router();
const ContactController = require("../Controller/ContactController");
const AuthController = require("../Controller/AuthController");
const UserController = require("../Controller/UserController");
const ServiceRequestController = require("../Controller/ServiceRequestController");
const ServicePlanController = require("../Controller/ServicePlanController");
// const SupervisiorController = require("../Controller/SupervisiorController");

//User
router.post("/register", AuthController.userregister);
router.post("/login", AuthController.login);
router.post("/forgetpassword", AuthController.forgetpassword);
router.post("/resetpassword", AuthController.resetPassword);
router.post("/sentotp", AuthController.sendotp);
router.post("/verifyotp", AuthController.verifyotp);
router.post("/registration", AuthController.registration);

//serviceplan
router.post("/create-serviceplan", ServicePlanController.serviceplan);
//Supervisior
router.post("/create-supervisior", UserController.createsupervisior);
router.get("/get-allsupervisior", UserController.getsupervisior);
router.get("/getsupervisiorbyid/:id", UserController.getsinglesupervisior);
router.post("/edit-user/:id", UserController.edituser);
router.delete("/delete/:id", UserController.deleteUser);

//Service
router.post("/create-service", ServiceRequestController.createservice);
router.get("/getallservice", ServiceRequestController.getallservice);
router.post("/edit-service/:id", ServiceRequestController.editservice);
router.get("/getservice/:id", ServiceRequestController.getServiceByid);
router.delete("/deleteservice", ServiceRequestController.deleteservice);
//contact
router.post("/create-contact", ContactController.createcontact);
router.get("/get-contact", ContactController.getcontactus);

module.exports = router;
