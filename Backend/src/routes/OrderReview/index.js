const express = require("express");
const Order = require("../../models/Order");
const Product = require("../../models/Product");
const router = express.Router();

router.post("/placeorder", async (req, res) => {
  try {
    const { userId, products } = req.body;

    let totalPrice = 0;

    const validatedProducts = [];
    for (const product of products) {
      const productDetails = await Product.findById(product.productId);
      if (!productDetails) {
        return res.status(400).json({ error: "Invalid product ID" });
      }

      const productData = {
        productId: product.productId,
        quantity: product.quantity,
      };
      validatedProducts.push(productData);

      totalPrice += productDetails.price * product.quantity;
    }

    const order = new Order({
      userId,
      products: validatedProducts,
      totalPrice,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/orders/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
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
