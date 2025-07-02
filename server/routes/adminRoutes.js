const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const Book = require("../models/bookModel");
const { protect } = require("../middleware/authMiddleware");

// 👥 Get all users
router.get("/users", protect, async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// 🛍️ Get all sellers
router.get("/sellers", protect, async (req, res) => {
  try {
    const sellers = await User.find({ role: "seller" }).select("-password");
    res.json(sellers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching sellers" });
  }
});

// 📊 Admin Analytics
router.get("/analytics", protect, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalSellers = await User.countDocuments({ role: "seller" });
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const totalBooks = await Book.countDocuments();
    const totalOrders = await Order.countDocuments();

    const orders = await Order.find().populate({
      path: "books.book",
      select: "title price",
    });

    let totalRevenue = 0;
    const bookSales = {};

    orders.forEach(order => {
      order.books.forEach(b => {
        totalRevenue += b.book?.price * b.quantity;

        if (b.book?.title) {
          bookSales[b.book.title] = (bookSales[b.book.title] || 0) + b.quantity;
        }
      });
    });

    const topBooks = Object.entries(bookSales)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([title, qty]) => ({ title, qty }));

    res.json({
      totalUsers,
      totalSellers,
      totalAdmins,
      totalBooks,
      totalOrders,
      totalRevenue,
      topBooks,
    });
  } catch (err) {
    console.error("❌ Admin analytics error:", err.message);
    res.status(500).json({ message: "Failed to fetch admin analytics" });
  }
});

module.exports = router;




