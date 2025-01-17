const paymentController=require("../../controllers/userController/paymentController");
const express=require('express');
const router=express();

router.post("/checkout",paymentController.checkout);
router.post("/paymentverification",paymentController.paymentverification);
router.post("/razorpay/webhook", paymentController.razorpayWebhook);



module.exports=router;

