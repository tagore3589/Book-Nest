const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");
const Book = require("../models/bookModel");
const User = require("../models/userModel");
const { protect } = require("../middleware/authMiddleware");

// ➕ Place an order
router.post("/", protect, async (req, res) => {
  const { books, totalAmount } = req.body;

  if (!books || books.length === 0) {
    return res.status(400).json({ message: "No books in the order" });
  }

  try {
    const order = new Order({
      user: req.user._id,
      books,
      totalAmount,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (err) {
    console.error("❌ Error placing order:", err.message);
    res.status(500).json({ message: "Failed to place order", error: err.message });
  }
});

// ✅ Get orders for a specific user
router.get("/user/:userId", protect, async (req, res) => {

  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate("books.book", "title price")
      .populate("updatedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching user orders:", err.message);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// ✅ Get orders for a seller
router.get("/seller/:sellerId", protect, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate({
        path: "books.book",
        populate: {
          path: "seller",
          model: "User",
          select: "name _id",
        },
      });

    const sellerOrders = orders.filter((order) =>
      order.books.some((b) => b.book?.seller?._id?.toString() === req.params.sellerId)
    );

    res.json(sellerOrders);
  } catch (err) {
    console.error("❌ Error fetching seller orders:", err.message);
    res.status(500).json({ message: "Failed to fetch seller orders", error: err.message });
  }
});

// ✅ Update order status
// ✅ Update order status
router.patch("/:orderId/update-status", protect, async (req, res) => {
  const { newStatus } = req.body;

  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = newStatus || "Delivered";
    order.updatedBy = req.user._id;
    await order.save();

    res.json({ message: "Order status updated successfully" });
  } catch (err) {
    console.error("❌ Status update error:", err.message);
    res.status(500).json({ message: "Failed to update order status" });
  }
});

// 📊 Seller Analytics
router.get("/seller/:sellerId/analytics", protect, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate({
        path: "books.book",
        select: "title price seller",
      });

    const sellerOrders = orders.filter(order =>
      order.books.some(book => book.book?.seller?.toString() === req.params.sellerId)
    );

    const totalOrders = sellerOrders.length;
    let totalRevenue = 0;
    let uniqueCustomers = new Set();
    let bookCountMap = {};

    sellerOrders.forEach(order => {
      uniqueCustomers.add(order.user._id.toString());
      order.books.forEach(b => {
        if (b.book?.seller?.toString() === req.params.sellerId) {
          totalRevenue += b.book.price * b.quantity;

          if (!bookCountMap[b.book.title]) {
            bookCountMap[b.book.title] = 0;
          }
          bookCountMap[b.book.title] += b.quantity;
        }
      });
    });

    const topBooks = Object.entries(bookCountMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([title, qty]) => ({ title, qty }));

    res.json({
      totalOrders,
      totalRevenue,
      totalBooksListed: await Book.countDocuments({ seller: req.params.sellerId }),
      uniqueCustomers: uniqueCustomers.size,
      topBooks,
    });
  } catch (err) {
    console.error("❌ Analytics error:", err.message);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
});

// ✅ Admin - Get all orders
router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate({
        path: "books.book",
        select: "title price",
      });

    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching all orders:", err.message);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// ✅ Admin Analytics
router.get("/analytics", protect, async (req, res) => {
  try {
    const users = await User.find();
    const books = await Book.find();
    const orders = await Order.find().populate("books.book");

    const totalUsers = users.length;
    const totalSellers = users.filter(user => user.role === "seller").length;
    const totalAdmins = users.filter(user => user.role === "admin").length;
    const totalBooks = books.length;
    const totalOrders = orders.length;

    let totalRevenue = 0;
    let bookSales = {};

    orders.forEach(order => {
      order.books.forEach(b => {
        totalRevenue += b.book?.price * b.quantity;

        const title = b.book?.title;
        if (title) {
          if (!bookSales[title]) bookSales[title] = 0;
          bookSales[title] += b.quantity;
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



