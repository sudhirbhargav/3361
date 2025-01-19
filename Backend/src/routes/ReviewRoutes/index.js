const express = require("express");
const Review = require("../../models/Review");
const Product = require("../../models/Product");
const router = express.Router();

router.get("/getreviews/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId }).populate(
      "userId",
      "username email"
    );
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/addreview", async (req, res) => {
  try {
    const { userId, productId, rating, comment } = req.body;

    // Check if product exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(400).json({ error: "Product not found" });
    }

    // Create and save the review
    const review = new Review({
      userId,
      productId,
      rating,
      comment,
    });

    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put("/updatereview/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    // Check if the review exists
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Update the review
    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    review.updatedAt = Date.now();

    const updatedReview = await review.save();
    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/deletereview/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the review exists
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Delete the review
    await Review.findByIdAndDelete(id);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
