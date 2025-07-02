import React, { useState } from "react";
import API from "../api/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, email, password };

    try {
      const res = await API.post("/users/register", formData);
      console.log("✅ Register Success:", res.data);
      localStorage.setItem("token", res.data.token);
      alert("Registration successful!");
    } catch (err) {
      console.error("❌ Register Failed:", err?.response?.data?.message);
      alert(err?.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#f0f8ff",
        padding: "1rem",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "450px",
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>📝 Register</h2>

        <div style={{ marginBottom: "1rem" }}>
          <label>Name:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#004080",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;


