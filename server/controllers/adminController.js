const User = require("../models/userModel");
const Order = require("../models/orderModel");


// 📌 Get all users (excluding passwords)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

// 📌 Get all sellers (with Role === "Seller")
const getAllSellers = async (req, res) => {
  try {
    const sellers = await User.find({ Role: "Seller" }).select("-password");
    res.status(200).json(sellers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sellers", error: error.message });
  }
};

// 📌 Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("book buyer").sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};

module.exports = { getAllUsers, getAllSellers, getAllOrders };

