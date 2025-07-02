import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/users/login", {
        email,
        password,
      });

      alert("✅ Login Successful");

      // ✅ Save full user object safely to localStorage
      localStorage.setItem("user", JSON.stringify(response.data));

      console.log("✅ Login Success:", response.data);

      navigate("/");
    } catch (err) {
      console.error("❌ Login Failed", err);
      alert("❌ Invalid credentials");
    }
  };

  return (
    <div style={{ padding: "2rem", minHeight: "100vh", background: "#f7f9fc" }}>
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center" }}>🔐 Login</h2>
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column" }}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit" style={{ marginTop: "1rem", padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px" }}>
            🔓 Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;




