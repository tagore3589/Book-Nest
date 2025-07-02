import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';

const SellerBooks = () => {
  const [books, setBooks] = useState([]);
  const seller = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get(`/books/seller/${seller._id}`);
        setBooks(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch seller books", err);
      }
    };

    if (seller?._id) fetchBooks();
  }, [seller]);

  const handleDelete = async (id) => {
    try {
      const token = seller?.token;
      await API.delete(`/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(books.filter(book => book._id !== id));
    } catch (err) {
      console.error("❌ Failed to delete book", err);
     
      alert(err?.response?.data?.message || "Delete failed. Please try again.");

    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📚 My Listed Books</h2>
      <Link to="/add-book" style={addBtn}>➕ Add New Book</Link>
      {books.length === 0 ? (
        <p>No books listed yet.</p>
      ) : (
        books.map(book => (
          <div key={book._id} style={card}>
            <img src={book.image} alt={book.title} style={img} />
            <div style={{ flex: 1 }}>
              <h4>{book.title}</h4>
              <p>₹{book.price} | Stock: {book.stock}</p>
              <p>Genre: {book.genre}</p>
            </div>
            <div style={actionButtons}>
              <Link to={`/edit-book/${book._id}`} style={editBtn}>✏️ Edit</Link>
              <button onClick={() => handleDelete(book._id)} style={delBtn}>❌ Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// ✅ Styles
const card = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  backgroundColor: '#fff',
  padding: '1rem',
  marginBottom: '1rem',
  borderRadius: '8px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
};

const img = {
  width: '80px',
  height: '100px',
  objectFit: 'cover',
  borderRadius: '6px'
};

const actionButtons = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

const delBtn = {
  background: '#e74c3c',
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  cursor: 'pointer'
};

const editBtn = {
  background: '#f39c12',
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  textAlign: 'center',
  textDecoration: 'none'
};

const addBtn = {
  marginBottom: '1rem',
  display: 'inline-block',
  textDecoration: 'none',
  background: '#3498db',
  color: '#fff',
  padding: '0.5rem 1rem',
  borderRadius: '6px'
};

export default SellerBooks;



