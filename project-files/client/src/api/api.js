import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Optional: You can auto-add token to all requests
API.interceptors.request.use((req) => {
  const user = localStorage.getItem("user");
  if (user) {
    const parsed = JSON.parse(user);
    req.headers.Authorization = `Bearer ${parsed.token}`;
  }
  return req;
});

export default API;

