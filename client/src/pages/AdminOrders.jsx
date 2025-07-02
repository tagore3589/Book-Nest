import React, { useEffect, useState } from "react";
import API from "../api/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders", {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch admin orders", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🧾 All Orders (Admin)</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={th}>User</th>
              <th style={th}>Books</th>
              <th style={th}>Total</th>
              <th style={th}>Date</th>
              <th style={th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={td}>{order.user?.name || "Unknown"}</td>
                <td style={td}>
                  <ul>
                    {order.books.map((b, idx) => (
                      <li key={idx}>
                        📘 {b.book?.title || "Unknown"} × {b.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td style={td}>₹{order.totalAmount}</td>
                <td style={td}>{new Date(order.createdAt).toLocaleString()}</td>
                <td style={td}>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const th = {
  padding: "10px",
  textAlign: "left",
  borderBottom: "2px solid #ddd",
};

const td = {
  padding: "10px",
};

export default AdminOrders;
