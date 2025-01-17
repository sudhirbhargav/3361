const express = require('express');
const router = express.Router();
const queryController = require("../../controllers/userController/queryController")

router.post('/add_query', queryController.addQuery);

module.exports = router;
