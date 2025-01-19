const jwt = require("jsonwebtoken");
const User = require("../../models/User"); // Adjust the path as needed
const SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    // Decode the token to get the user ID
    const decoded = jwt.verify(token, SECRET);

    // Fetch the user from the database using the decoded ID
    const user = await User.findById(decoded?.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach the user object to the request
    req.userId = user.id;
    req.email = user.email;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Handle token errors
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
