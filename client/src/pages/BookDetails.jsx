import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await API.get(`/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error("Failed to fetch book:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // 🛒 Add to cart
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = cart.find(item => item._id === book._id);
    if (!exists) {
      cart.push(book);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert("✅ Book added to cart!");
    } else {
      alert("⚠️ Already in cart");
    }
  };

  // 💛 Add to wishlist
  const handleAddToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const exists = wishlist.find(item => item._id === book._id);
    if (!exists) {
      wishlist.push(book);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      alert("✅ Book added to wishlist!");
    } else {
      alert("⚠️ Already in wishlist");
    }
  };

  if (loading) return <p>Loading book details...</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div style={{
      padding: '3rem 1rem',
      minHeight: '100vh',
      backgroundColor: '#f4f8fc',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 0 20px rgba(0,0,0,0.1)',
        maxWidth: '1200px',
        width: '100%'
      }}>
        <img src={book.image} alt={book.title} style={{
          width: '300px',
          height: '350px',
          objectFit: 'contain',
          borderRadius: '10px',
          backgroundColor: '#f9f9f9',
          padding: '10px'
        }} />
        <div style={{ flex: 1 }}>
          <h2>{book.title}</h2>
          <p><strong>✍️ Author:</strong> {book.author}</p>
          <p><strong>💰 Price:</strong> ₹{book.price}</p>
          <p style={{ marginTop: '1rem' }}>{book.description}</p>

          {/* Buttons */}
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <button
              onClick={handleAddToCart}
              style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '6px' }}
            >
              🛒 Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist}
              style={{ padding: '10px 20px', backgroundColor: '#ffc107', color: '#000', border: 'none', borderRadius: '6px' }}
            >
              💖 Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;


