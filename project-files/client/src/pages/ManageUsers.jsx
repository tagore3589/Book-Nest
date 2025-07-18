import React, { useEffect, useState } from "react";
import API from "../api/api";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/admin/users", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch users", err);
      }
    };

    fetchUsers();
  }, [user]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>👥 Manage Users</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageUsers;
