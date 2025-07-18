import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/api';

const EditBook = () => {
  const { id } = useParams();
  const [bookData, setBookData] = useState(null);
  const navigate = useNavigate();
  const seller = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await API.get(`/books/${id}`);
        setBookData(res.data);
      } catch (err) {
        console.error("❌ Error fetching book", err);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/books/${id}`, bookData, {
        headers: { Authorization: `Bearer ${seller.token}` },
      });
      alert("✅ Book updated!");
      navigate("/seller-books");
    } catch (err) {
      console.error("❌ Failed to update book", err);
      alert("Update failed");
    }
  };

  if (!bookData) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>✏️ Edit Book</h2>
      <form onSubmit={handleUpdate} style={{ maxWidth: '500px' }}>
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
        <button type="submit" style={submitBtn}>💾 Update</button>
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
  backgroundColor: '#f39c12',
  color: '#fff',
  border: 'none',
  padding: '0.6rem 1.2rem',
  borderRadius: '6px',
  cursor: 'pointer'
};

export default EditBook;
