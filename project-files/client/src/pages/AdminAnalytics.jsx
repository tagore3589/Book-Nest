// src/pages/AdminAnalytics.jsx
import React, { useEffect, useState } from "react";
import API from "../api/api";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale } from "chart.js";
Chart.register(BarElement, CategoryScale, LinearScale);

const AdminAnalytics = () => {
  const [stats, setStats] = useState(null);
  const admin = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await API.get("/admin/analytics", {
          headers: { Authorization: `Bearer ${admin.token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch admin analytics", err);
      }
    };
    fetchAnalytics();
  }, [admin]);

  if (!stats) return <p>Loading admin analytics...</p>;

  const barData = {
    labels: stats.topBooks.map(book => book.title),
    datasets: [
      {
        label: "Top 5 Selling Books",
        data: stats.topBooks.map(book => book.qty),
        backgroundColor: "#3498db",
      },
    ],
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📊 Admin Dashboard - Analytics</h2>
      <ul>
        <li>Total Users: {stats.totalUsers}</li>
        <li>Total Sellers: {stats.totalSellers}</li>
        <li>Total Admins: {stats.totalAdmins}</li>
        <li>Total Books: {stats.totalBooks}</li>
        <li>Total Orders: {stats.totalOrders}</li>
        <li>Total Revenue: ₹{stats.totalRevenue}</li>
      </ul>

      <div style={{ maxWidth: "600px", marginTop: "2rem" }}>
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default AdminAnalytics;
