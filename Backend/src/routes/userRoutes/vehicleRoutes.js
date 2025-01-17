const express = require('express');
const vehicleController=require("../../controllers/user/vehicleController")
const authController = require('../../controllers/user/userAuth');
const schemaVailidation = require("../../validations/user/userValidation")
const router = express.Router();
const isUserAuthenticated=require("../../middleware/user/userAuthenticated");
const {isUserAuthorized}=require("../../middleware/user/userAuthorized")



router.post("/add-vehicle",isUserAuthenticated,isUserAuthorized,vehicleController.addVehicle);

router.delete("/delete_vehicle/:id",isUserAuthenticated,isUserAuthorized, vehicleController.deleteVehicle)




module.exports = router;