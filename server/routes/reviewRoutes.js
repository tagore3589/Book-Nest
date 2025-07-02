const express = require("express");
const router = express.Router();
const { addReview, getBookReviews } = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");

// 📌 Add review
router.post("/", protect, addReview);

// 📌 Get reviews for a book
router.get("/:bookId", getBookReviews);

module.exports = router;
