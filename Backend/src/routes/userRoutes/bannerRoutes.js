const express = require('express');
const router = express.Router();
const BannerController = require('../../controllers/userController/bannerController');

router.get('/get_banners', BannerController.getBanners);


module.exports = router;
