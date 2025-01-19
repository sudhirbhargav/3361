const express = require("express");
const Category = require("../../models/Category");
const router = express.Router();

// Get all categories
router.get("/getcategories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new category
router.post("/addcategories", async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const category = new Category({ name, description });
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
