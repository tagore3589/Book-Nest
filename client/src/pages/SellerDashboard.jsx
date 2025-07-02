import React, { useEffect, useState } from 'react';
import API from '../api/api';

const SellerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const seller = JSON.parse(localStorage.getItem("user"));

  const fetchOrders = async () => {
    try {
      const res = await API.get(`/orders/seller/${seller._id}`);
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch seller orders", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await API.patch(`/orders/${orderId}/update-status`, { newStatus });
      fetchOrders(); // refresh after update
    } catch (err) {
      console.error("Failed to update order status", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📦 Seller Orders - {seller.name}</h2>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <table border="1" cellPadding="10" style={{ marginTop: "1rem", borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>User</th>
              <th>Book</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) =>
              order.books.map((item, i) => {
                // Only show if this seller owns the book
                if (item.book?.seller?._id !== seller._id) return null;
                return (
                  <tr key={i}>
                    <td>{order.user?.name}</td>
                    <td>{item.book?.title}</td>
                    <td>{item.quantity}</td>
                    <td>{order.status}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      >
                        {["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SellerDashboard;








