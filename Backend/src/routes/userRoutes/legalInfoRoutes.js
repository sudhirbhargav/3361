const express = require('express');
const router = express.Router();
const LegalInfOController=require("../../controllers/adminController/LegalInfoController")


router.get("/get_legal_info",LegalInfOController.getLegalInfo)


module.exports = router;
