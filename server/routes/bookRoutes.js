const express = require("express");
const router = express.Router();
const Book = require("../models/bookModel");
const { protect } = require("../middleware/authMiddleware");

// 📘 GET all books (with search feature)
router.get("/", async (req, res) => {
  try {
    const { keyword } = req.query;
    let query = {};

    if (keyword) {
      query = {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { author: { $regex: keyword, $options: "i" } },
          { genre: { $regex: keyword, $options: "i" } },
        ],
      };
    }

    const books = await Book.find(query);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Error fetching books" });
  }
});

// 📗 GET single book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: "Error fetching book" });
  }
});

// 📙 GET books by seller
router.get("/seller/:sellerId", async (req, res) => {
  try {
    const books = await Book.find({ seller: req.params.sellerId });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Error fetching seller books" });
  }
});

// ➕ POST create a new book
router.post("/", protect, async (req, res) => {
  const book = new Book({ ...req.body, seller: req.user._id });
  try {
    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to create book" });
  }
});

// ✏️ PUT update a book
router.put("/:id", protect, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});

// ❌ DELETE a book
router.delete("/:id", protect, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await book.remove();
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});

module.exports = router;








