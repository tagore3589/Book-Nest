import React, { useEffect, useState } from 'react';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(stored);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(item => item._id !== id);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  const addToCart = (book) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = cart.find(item => item._id === book._id);
    if (!exists) {
      cart.push({ ...book, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
      alert("✅ Added to Cart");
    }
  };

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#fff8f2' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '2rem' }}>💖 Your Wishlist</h2>

        {wishlist.length === 0 ? (
          <p>No books in wishlist yet.</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem'
          }}>
            {wishlist.map(book => (
              <div key={book._id} style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '1rem',
                backgroundColor: '#fff',
                boxShadow: '0 0 8px rgba(0,0,0,0.05)',
                textAlign: 'center'
              }}>
                <img src={book.image} alt={book.title} style={{
                  width: '100%',
                  height: '260px',
                  objectFit: 'cover',
                  borderRadius: '5px'
                }} />
                <h4 style={{ marginTop: '1rem' }}>{book.title}</h4>
                <p>✍️ {book.author}</p>
                <p>💰 ₹{book.price}</p>
                <button onClick={() => addToCart(book)} style={btnGreen}>🛒 Add to Cart</button>
                <button onClick={() => removeFromWishlist(book._id)} style={btnRed}>❌ Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const btnGreen = {
  margin: '10px 5px',
  padding: '6px 10px',
  backgroundColor: '#2ecc71',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const btnRed = {
  margin: '10px 5px',
  padding: '6px 10px',
  backgroundColor: '#e74c3c',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

export default Wishlist;


