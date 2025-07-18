import React, { useEffect, useState } from 'react';
import API from '../api/api';

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const seller = JSON.parse(localStorage.getItem("user")); // seller must be logged in

  useEffect(() => {
    const fetchSellerOrders = async () => {
      try {
        const res = await API.get(`/orders/seller/${seller._id}`);
        setOrders(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch seller orders", err);
      }
    };

    if (seller?._id) fetchSellerOrders();
  }, [seller]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📦 Seller Orders</h2>
      {orders.length === 0 ? (
        <p>No orders for your books yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={order._id} style={{
            background: "#fff",
            margin: "1rem 0",
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
          }}>
            <h4>🧾 Order #{index + 1}</h4>
            <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
            <p><strong>Items:</strong></p>
            <ul>
              {order.items.map((item, i) => (
                <li key={i}>
                  📚 {item.bookId?.title} - ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default SellerOrders;
