
const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// 📌 Register new user
router.post("/register", registerUser);

// 📌 Login user
router.post("/login", loginUser);

// 🔒 Protected route (Get profile)
router.get("/profile", protect, getUserProfile);

module.exports = router;

