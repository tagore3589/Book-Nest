import React, { useEffect, useState } from 'react';
import API from "../api/api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setGrandTotal(total);
  }, [cartItems]);

  const updateQuantity = (id, change) => {
    const updated = cartItems.map(item => {
      if (item._id === id) {
        const newQty = item.quantity + change;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const removeFromCart = (id) => {
    const updated = cartItems.filter(item => item._id !== id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const handleOrder = async () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const userString = localStorage.getItem("user");

    if (!userString) {
      alert("❗ Please login to place an order.");
      return;
    }

    try {
      const user = JSON.parse(userString);

      const books = cartItems.map(item => ({
        book: item._id,
        quantity: item.quantity || 1
      }));

      const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      console.log("📦 Sending order to backend", { books, totalAmount });

      await API.post("/orders", { books, totalAmount });

      alert("✅ Order placed successfully!");
      setCartItems([]);
      localStorage.removeItem('cart');
    } catch (err) {
      console.error("❌ Order placing failed", err);
      alert("Order failed. Please try again.");
    }
  };

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#f7f9fc' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '2rem', fontWeight: 'bold' }}>🛒 Your Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty 😢</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item._id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                padding: '1rem',
                borderRadius: '10px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <img src={item.image} alt={item.title} style={{ width: '100px', height: '120px', borderRadius: '5px' }} />
                <div style={{ flex: 1, marginLeft: '1rem' }}>
                  <h4>{item.title}</h4>
                  <p>✍️ {item.author}</p>
                  <p>₹{item.price} x {item.quantity} = <strong>₹{item.price * item.quantity}</strong></p>

                  <div>
                    <button onClick={() => updateQuantity(item._id, -1)} style={qtyBtn}>➖</button>
                    <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, 1)} style={qtyBtn}>➕</button>
                    <button onClick={() => removeFromCart(item._id)} style={removeBtn}>❌ Remove</button>
                  </div>
                </div>
              </div>
            ))}

            <div style={{ textAlign: 'right', marginTop: '2rem' }}>
              <h3>Total: ₹{grandTotal}</h3>
              <button onClick={handleOrder} style={orderBtn}>✅ Place Order</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const qtyBtn = {
  padding: '4px 10px',
  margin: '0 5px',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '5px',
  border: '1px solid #ccc'
};

const removeBtn = {
  marginLeft: '15px',
  padding: '5px 10px',
  backgroundColor: '#ff4d4f',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const orderBtn = {
  padding: '10px 20px',
  backgroundColor: '#2ecc71',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontSize: '16px',
  cursor: 'pointer'
};

export default Cart;





