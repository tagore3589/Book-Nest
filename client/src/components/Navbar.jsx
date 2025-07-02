
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { userToken, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      padding: '1rem 2rem',
      backgroundColor: '#004080',
      color: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div>
        <Link to="/" style={{ marginRight: '1.5rem', color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
          📚 BookNest
        </Link>
        <Link to="/" style={{ marginRight: '1rem', color: '#fff' }}>🏠 Home</Link>
        <Link to="/books" style={{ marginRight: '1rem', color: '#fff' }}>📖 Books</Link>
        <Link to="/cart" style={{ color: '#fff', marginLeft: '1rem' }}>🛒 Cart</Link>
        <Link to="/wishlist" style={{ color: '#fff', marginLeft: '1rem' }}>💖 Wishlist</Link>
       
        <Link to="/my-orders" style={{ marginLeft: '1rem', color: '#fff' }}>📜 My Orders</Link>

        {/* ✅ Seller Routes */}
        {user?.role === "seller" && (
          <>
            <Link to="/seller-dashboard" style={{ marginLeft: '1rem', color: 'orange', fontWeight: 'bold' }}>
              📦 Seller Dashboard
            </Link>
            <Link to="/seller-books" style={{ marginLeft: '1rem', color: 'cyan', fontWeight: 'bold' }}>
              📚 My Listed Books
            </Link>
            <Link to="/add-book" style={{ marginLeft: '1rem', color: '#0f0', fontWeight: 'bold' }}>
              ➕ Add Book
            </Link>
            <Link to="/seller-analytics" style={{ marginLeft: '1rem', color: 'gold', fontWeight: 'bold' }}>
              📊 Analytics
            </Link>
          </>
        )}

        {/* ✅ Admin Routes */}
        {user?.role === "admin" && (
  <>
    <Link
      to="/admin-dashboard"
      style={{ marginLeft: '1rem', color: 'yellow', fontWeight: 'bold' }}
    >
      🛠️ Admin Panel
    </Link>
    <Link
      to="/admin/users"
      style={{ marginLeft: '1rem', color: '#f0f', fontWeight: 'bold' }}
    >
      👥 Users
    </Link>
    <Link
      to="/admin/sellers"
      style={{ marginLeft: '1rem', color: '#0ff', fontWeight: 'bold' }}
    >
      🛍️ Sellers
    </Link>
    <Link
  to="/admin/orders"
  style={{ marginLeft: '1rem', color: '#00f', fontWeight: 'bold' }}
>
  📜 Admin Orders
</Link>
<Link
  to="/admin-analytics"
  style={{ marginLeft: '1rem', color: 'aqua', fontWeight: 'bold' }}
>
  📊 Analytics
</Link>


  </>
)}

      </div>

      <div>
        {!userToken ? (
          <>
            <Link to="/login" style={{ marginRight: '1rem', color: '#fff' }}>🔐 Login</Link>
            <Link to="/register" style={{ color: '#fff' }}>📝 Register</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#ff4d4d',
              color: '#fff',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            🚪 Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;










