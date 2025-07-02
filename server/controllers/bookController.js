const Book = require("../models/bookModel");

// ➕ Add a new book (Seller only)
const createBook = async (req, res) => {
  const { title, author, description, price, quantity, category } = req.body;

  try {
    const book = new Book({
      title,
      author,
      description,
      price,
      quantity,
      category,
      seller: req.user._id, // assuming auth middleware sets req.user
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(500).json({ message: "Failed to create book", error: error.message });
  }
};

// 📘 Get all books (for all users)
const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("seller", "name email");
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch books", error: error.message });
  }
};

// ❌ Delete book by ID (seller only)
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    await book.remove();
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete book", error: error.message });
  }
};

module.exports = { createBook, getBooks, deleteBook };

