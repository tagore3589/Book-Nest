const Order = require("../models/orderModel");

const placeOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const newOrder = await Order.create({
      userId,
      items,
      totalAmount,
    });

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("❌ Order placing failed", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// 📦 Get orders for books listed by this seller
const getOrdersForSeller = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    const orders = await Order.find()
      .populate("items.bookId")
      .sort({ createdAt: -1 });

    const sellerOrders = orders.map(order => {
      const sellerItems = order.items.filter(item => {
        return item.bookId?.seller?.toString() === sellerId;
      });

      return sellerItems.length
        ? { ...order._doc, items: sellerItems }
        : null;
    }).filter(Boolean);

    res.status(200).json(sellerOrders);
  } catch (err) {
    res.status(500).json({ message: "Fetching seller orders failed", error: err.message });
  }
};


module.exports = { placeOrder, getMyOrders, getOrdersForSeller }; // ✅ FIXED EXPORT





