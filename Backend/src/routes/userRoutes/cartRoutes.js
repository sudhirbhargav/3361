const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/userController/cartController');

router.post('/add_update_cart', cartController.addAndUpdateCart);
router.get('/get_cart_items', cartController.getCartItems);

router.delete('/clear_cart', cartController.clearAllCartItems);
router.delete('/delete_cart/:id', cartController.deleteCartItemById);


module.exports = router;
