const shippingController=require("../../controllers/userController/shippingController")
const express=require('express');
const router=express();

router.get("/get_shipping_address",shippingController.getShippingAddress);
router.post("/add_update_shipping_address",shippingController.addOrUpdateShippingAddress);


module.exports=router;
