import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    price: '',
    stock: '',
    genre: '',
    image: ''
  });

  const seller = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${seller.token}`,
          "Content-Type": "application/json"
        },
      };

      await API.post("/books", bookData, config);
      alert("✅ Book added successfully!");
      navigate("/seller-books");
    } catch (err) {
      console.error("❌ Failed to add book", err);
      alert("Failed to add book.");
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>➕ Add a New Book</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
        {["title", "author", "price", "stock", "genre", "image"].map(field => (
          <div key={field} style={{ marginBottom: '1rem' }}>
            <label>{field.toUpperCase()}</label>
            <input
              name={field}
              value={bookData[field]}
              onChange={handleChange}
              required={field !== "image"}
              type={["price", "stock"].includes(field) ? "number" : "text"}
              style={input}
            />
          </div>
        ))}
        <button type="submit" style={submitBtn}>📤 Submit</button>
      </form>
    </div>
  );
};

const input = {
  width: '100%',
  padding: '0.5rem',
  border: '1px solid #ccc',
  borderRadius: '5px'
};

const submitBtn = {
  backgroundColor: '#2ecc71',
  color: '#fff',
  border: 'none',
  padding: '0.6rem 1.2rem',
  borderRadius: '6px',
  cursor: 'pointer'
};

export default AddBook;

