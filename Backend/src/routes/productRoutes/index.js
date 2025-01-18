const express = require("express");
const Product = require("../../models/Product");
const Category = require("../../models/Category");
const router = express.Router();

router.get("/getproduct", async (req, res) => {
  try {
    const products = await Product.find().populate(
      "categoryId",
      "name description"
    );
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/addproduct", async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      categoryId,
      images,
      stock,
      discount,
      userId,
    } = req.body;

    // Check if category exists
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    // Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const product = new Product({
      name,
      description,
      price,
      categoryId,
      images, // Array of image URLs
      stock: stock || 0, // Default to 0 if not provided
      discount: discount || 0, // Default to 0 if not provided
      userId, // Associate userId with the product
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("updateproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, categoryId, images, stock, discount } =
      req.body;

    // Validate categoryId if provided
    const categoryExists = await Category.findById(categoryId);
    if (categoryId && !categoryExists) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        categoryId,
        images,
        stock,
        discount,
        updatedAt: Date.now(), // Update the timestamp
      },
      { new: true }
    )
      .populate("categoryId", "name description")
      .populate("userId", "username email");

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
