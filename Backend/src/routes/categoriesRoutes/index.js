const express = require("express");
const router = express.Router();

router.get("/categories", async (req, res) => {
  try {
    const categories = [
      { id: 1, name: "Kitchen Appliances" },
      { id: 2, name: "Furniture" },
      { id: 3, name: "Electronics" },
      { id: 4, name: "Stationery" },
    ];
    res.status(201).json({
      message: "Categories fetched successfully!",
      categories: categories,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
