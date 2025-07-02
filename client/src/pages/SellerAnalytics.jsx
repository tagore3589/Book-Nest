import React, { useEffect, useState } from 'react';
import API from '../api/api';

const SellerAnalytics = () => {
  const [stats, setStats] = useState(null);
  const seller = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get(`/orders/seller/${seller._id}/analytics`);
        setStats(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch analytics", err);
      }
    };

    if (seller?._id) fetchStats();
  }, [seller]);

  if (!stats) return <p style={{ padding: '2rem' }}>📊 Loading analytics...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📈 Seller Analytics</h2>
      <ul style={listStyle}>
        <li>📦 Total Orders: <strong>{stats.totalOrders}</strong></li>
        <li>📚 Books Listed: <strong>{stats.totalBooksListed}</strong></li>
        <li>💰 Total Revenue: ₹<strong>{stats.totalRevenue}</strong></li>
        <li>🧍‍♂️ Unique Customers: <strong>{stats.uniqueCustomers}</strong></li>
      </ul>

      <h3>🏆 Top 3 Best-selling Books</h3>
      <ol>
        {stats.topBooks.map((b, i) => (
          <li key={i}>{b.title} — {b.qty} sold</li>
        ))}
      </ol>
    </div>
  );
};

const listStyle = {
  listStyleType: 'none',
  padding: 0,
  marginBottom: '2rem',
  fontSize: '1.1rem',
  lineHeight: '2rem'
};

export default SellerAnalytics;
