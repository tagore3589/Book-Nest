// backend/models/bookModel.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 1 },
  image: { type: String },
  genre: { type: String },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);



