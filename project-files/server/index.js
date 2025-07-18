const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require("./routes/bookRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require('./routes/adminRoutes');
const reviewRoutes = require("./routes/reviewRoutes");







const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ MIDDLEWARES
app.use(cors());
app.use(express.json()); // <-- This line is IMPORTANT

// ✅ ROUTES
app.use('/api/users', userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});






