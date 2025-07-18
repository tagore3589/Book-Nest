import React from "react";

const Home = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#f0f8ff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          textAlign: "center",
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        }}
      >
        <h1>📚 Welcome to BookNest</h1>
        <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>
          Discover, explore, and grab your favorite books with ease!
        </p>
      </div>
    </div>
  );
};

export default Home;
