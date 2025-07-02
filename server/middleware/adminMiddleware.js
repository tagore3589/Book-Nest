const User = require("../models/userModel");

const adminOnly = async (req, res, next) => {
  try {
    // req.user will be the full user object
    const role = req.user.role;

    console.log("🔍 Authenticated user role:", role);

    if (role && role.toLowerCase() === "admin") {
      next();
    } else {
      res.status(403).json({ message: `Access denied. Role: ${role}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Admin check failed", error: error.message });
  }
};

module.exports = { adminOnly };









