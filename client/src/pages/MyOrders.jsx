import React, { useEffect, useState } from 'react';
import API from '../api/api';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get(`/orders/user/${user._id}`);

        setOrders(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch orders", err);
      }
    };

    if (user?._id) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📜 My Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders yet 🥲</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '1rem',
            marginBottom: '1rem',
            background: '#fff'
          }}>
            <h4>🧾 Order #{index + 1}</h4>
            <p><strong>Date:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total Amount:</strong> ₹{order.totalAmount ?? "N/A"}</p>
            <ul>
              {order.books.map((item, i) => (
                <li key={i}>
                  📚 {item.book?.title || "Unknown Book"} × {item.quantity} = ₹{item.book?.price && item.quantity ? item.book.price * item.quantity : "?"}
                </li>
              ))}
            </ul>
            {order.updatedBy && (
  <p style={{ marginTop: "0.5rem", color: "gray" }}>
    ✅ Status updated by: {order.updatedBy.name} ({order.updatedBy.email})
  </p>
)}

          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;




