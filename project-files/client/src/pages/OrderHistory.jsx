import React, { useEffect, useState } from "react";
import API from "../api/api";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("token"); // or decode from token if needed

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get(`/orders/user/${userId}`);
        setOrders(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) return <p>Loading your orders...</p>;
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "1rem" }}>📦 My Order History</h2>
      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            marginBottom: "1.5rem",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "1rem",
            backgroundColor: "#fefefe",
            boxShadow: "0 0 10px rgba(0,0,0,0.05)"
          }}
        >
          <p><strong>🧾 Order ID:</strong> {order._id}</p>
          <p><strong>📅 Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>💰 Total Amount:</strong> ₹{order.totalAmount}</p>
          <div>
            <strong>📚 Items:</strong>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.title} – ₹{item.price} × {item.quantity || 1}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
