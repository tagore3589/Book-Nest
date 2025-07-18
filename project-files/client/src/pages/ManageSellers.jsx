import React, { useEffect, useState } from "react";
import API from "../api/api";

const ManageSellers = () => {
  const [sellers, setSellers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const res = await API.get("/admin/sellers", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setSellers(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch sellers", err);
      }
    };

    fetchSellers();
  }, [user]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🛍️ Manage Sellers</h2>
      {sellers.length === 0 ? (
        <p>No sellers found</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Joined At</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{new Date(s.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageSellers;
