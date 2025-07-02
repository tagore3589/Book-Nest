import React, { useState, useEffect } from "react";
import API from "../api/api"; // Axios instance
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setBooks(cart);
  }, []);

  const placeOrder = async () => {
    try {
      const payload = {
        user: user._id,
        books: books.map((book) => ({
          book: book._id,
          quantity: book.quantity || 1,
        })),
      };

      await API.post("/orders", payload, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      alert("✅ Order placed successfully!");
      localStorage.removeItem("cart");
      navigate("/my-orders");
    } catch (err) {
      console.error("❌ Order failed", err);
      alert("Failed to place order");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🛒 Review Your Order</h2>
      {books.length === 0 ? (
        <p>No books selected.</p>
      ) : (
        <>
          <ul>
            {books.map((b) => (
              <li key={b._id}>
                {b.title} - Qty: {b.quantity || 1}
              </li>
            ))}
          </ul>
          <button onClick={placeOrder}>📤 Place Order</button>
        </>
      )}
    </div>
  );
};

export default PlaceOrder;
