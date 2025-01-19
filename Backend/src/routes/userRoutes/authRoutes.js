const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const router = express.Router();
const SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });

    // Include user information in the response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/verify", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ valid: false, error: "Token is required" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, SECRET);

    // If the token is valid, return success
    res.status(200).json({ valid: true, user: decoded });
  } catch (err) {
    // Handle token verification errors
    res.status(401).json({ valid: false, error: "Invalid or expired token" });
  }
});

module.exports = router;
