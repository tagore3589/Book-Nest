import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>🛠️ Admin Dashboard</h2>
      <div style={grid}>
        <Link to="/admin/users" style={card}>👥 Manage Users</Link>
        <Link to="/admin/orders" style={card}>🛒 View All Orders</Link>
        <Link to="/admin/books" style={card}>📚 All Books</Link>
        <Link to="/admin/analytics" style={card}>📊 Analytics</Link>
      </div>
    </div>
  );
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '1rem',
  marginTop: '2rem'
};

const card = {
  padding: '1.5rem',
  backgroundColor: '#f9f9f9',
  border: '1px solid #ddd',
  borderRadius: '8px',
  textAlign: 'center',
  textDecoration: 'none',
  fontWeight: 'bold',
  color: '#333',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

export default AdminDashboard;


