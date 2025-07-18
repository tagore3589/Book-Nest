const Review = require("../models/reviewModel");
const Book = require("../models/bookModel");

const addReview = async (req, res) => {
  const { bookId, rating, comment } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const alreadyReviewed = await Review.findOne({ book: bookId, user: req.user._id });
    if (alreadyReviewed) return res.status(400).json({ message: "Already reviewed" });

    const review = await Review.create({
      book: bookId,
      user: req.user._id,
      rating,
      comment
    });

    // Update book's average rating
    const reviews = await Review.find({ book: bookId });
    book.numReviews = reviews.length;
    book.ratings = reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;
    await book.save();

    res.status(201).json({ message: "Review added", review });
  } catch (error) {
    res.status(500).json({ message: "Failed to add review", error: error.message });
  }
};

const getBookReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId }).populate("user", "name");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
  }
};

module.exports = { addReview, getBookReviews };
