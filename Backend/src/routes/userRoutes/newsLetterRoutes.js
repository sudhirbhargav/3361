const express = require('express');
const router = express.Router();
const NewsLetterController=require("../../controllers/userController/newsLetterController")

router.get("/get_emails",NewsLetterController.getAllEmails)

module.exports = router;
