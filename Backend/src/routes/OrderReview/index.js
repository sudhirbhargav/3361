const express = require("express");
const Order = require("../../models/Order");
const Product = require("../../models/Product");
const verifyToken = require("../../routes/Middleware/TokenVerification");
const router = express.Router();

router.post("/placeorder", verifyToken, async (req, res) => {
  try {
    const { products } = req.body;
    const userId = req.userId; // Extracted from verifyToken middleware

    let totalPrice = 0;
    const validatedProducts = [];

    for (const product of products) {
      // Fetch product details from DB
      const productDetails = await Product.findById(product.productId);
      if (!productDetails) {
        return res.status(400).json({ error: "Invalid product ID" });
      }

      // Validate and calculate total price
      const productData = {
        productId: product.productId,
        quantity: product.quantity,
        price: productDetails.price, // Include price if needed in response
      };
      validatedProducts.push(productData);

      totalPrice += productDetails.price * product.quantity;
    }

    // Create a new order
    const order = new Order({
      userId,
      products: validatedProducts,
      totalPrice,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder); // Send saved order details
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/orderhistory", verifyToken, async (req, res) => {
  try {
    const { userId } = req;
    const orders = await Order.find({ userId }).populate(
      "products.productId",
      "name price"
    );
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/updateorder/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["placed", "shipped", "delivered"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/deleteorder/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
