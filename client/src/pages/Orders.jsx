import React, { useEffect, useState } from "react";
import API from "../api/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const response = await API.get(`/orders/user/${user._id}`);
        setOrders(response.data);
      } catch (err) {
        console.error("❌ Failed to fetch orders", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📦 My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found. Start shopping now!</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} style={{ marginBottom: "1rem", padding: "1rem", border: "1px solid #ccc" }}>
            <h4>Order #{index + 1}</h4>
            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <ul>
              {order.books.map((item, idx) => (
                <li key={idx}>
                  {item.book?.title} × {item.quantity} = ₹{item.book?.price * item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;

