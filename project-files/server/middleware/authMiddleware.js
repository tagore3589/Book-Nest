const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// ✅ Middleware to verify token and attach user
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = user; // ✅ Attach user object to request
      console.log("✅ Authenticated User:", req.user);

      next();
    } catch (error) {
      console.log("❌ Token verification failed:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// ✅ Middleware to restrict to admin only
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};

module.exports = { protect, isAdmin };





