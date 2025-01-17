const express = require('express');
const authController = require('../../controllers/userController/userAuth');
const schemaVailidation = require("../../validations/userValidation")
const router = express.Router();
const isUserAuthenticated=require("../../middleware/userAuthenticated");
const {isUserAuthorized}=require("../../middleware/userAuthorized")




router.post("/signup", authController.registeredUser)
router.post("/isverified",authController.isVerified);
router.post("/signin",authController.userLogin);
router.post("/resend-otp",authController.reSendOtp);
router.post("/reset-password",authController.resetPassword);
router.post("/forgot-password",authController.forgotPassword);


// router.use(isUserAuthenticated);


router.post("/change-password",isUserAuthorized,authController.changePassword);


module.exports = router;