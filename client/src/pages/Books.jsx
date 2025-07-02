import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get(`/books?keyword=${search}`);
        setBooks(res.data);
      } catch (err) {
        console.error("Failed to fetch books", err);
      }
    };

    fetchBooks();
  }, [search]);

  const addToWishlist = (book) => {
    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    const exists = stored.find(b => b._id === book._id);
    if (!exists) {
      localStorage.setItem('wishlist', JSON.stringify([...stored, book]));
      alert("💖 Added to Wishlist!");
    }
  };

  const addToCart = (book) => {
    const stored = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = stored.find(b => b._id === book._id);
    if (!exists) {
      localStorage.setItem('cart', JSON.stringify([...stored, { ...book, quantity: 1 }]));
      alert("🛒 Added to Cart!");
    }
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f4f8fc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '2rem', fontWeight: 'bold', fontSize: '28px' }}>
          📚 Available Books
        </h2>

        {/* 🔍 Search Input */}
        <input
          type="text"
          placeholder="🔍 Search by title, author, or genre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '0.5rem 1rem',
            width: '300px',
            marginBottom: '2rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '16px'
          }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '5rem',
          }}
        >
          {books.map((book) => (
            <div
              key={book._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '1rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                backgroundColor: '#fff',
                textAlign: 'center',
              }}
            >
              <Link
                to={`/books/${book._id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <img
                  src={book.image}
                  alt={book.title}
                  style={{
                    width: '100%',
                    height: '280px',
                    objectFit: 'cover',
                    borderRadius: '5px',
                  }}
                />
                <h3 style={{ marginTop: '1rem', fontSize: '20px' }}>{book.title}</h3>
                <p style={{ margin: '0.5rem 0' }}>✍️ {book.author}</p>
                <p style={{ fontWeight: 'bold', color: '#2c3e50' }}>💰 ₹{book.price}</p>
              </Link>

              <button
                onClick={() => addToWishlist(book)}
                style={{
                  marginTop: '10px',
                  padding: '6px 10px',
                  backgroundColor: '#ff4081',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  marginRight: '10px',
                  cursor: 'pointer',
                }}
              >
                💖 Wishlist
              </button>

              <button
                onClick={() => addToCart(book)}
                style={{
                  marginTop: '10px',
                  padding: '6px 10px',
                  backgroundColor: '#4caf50',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                🛒 Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Books;








