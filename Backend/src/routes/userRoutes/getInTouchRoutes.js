const express = require('express');
const router = express.Router();
const getInTouchController = require("../../controllers/userController/getInTouchController")

router.get('/get_details', getInTouchController.getDetails);

module.exports = router;
