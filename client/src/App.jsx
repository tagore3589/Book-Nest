
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Books from "./pages/Books"; 
import BookDetails from "./pages/BookDetails";
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders'; 
import OrderHistory from './pages/OrderHistory';
import MyOrders from './pages/MyOrders'; 
import SellerOrders from './pages/SellerOrders';
import SellerDashboard from './pages/SellerDashboard';
import SellerBooks from './pages/SellerBooks';
import AddBook from './pages/AddBook';
import EditBook from "./pages/EditBook";
import SellerAnalytics from "./pages/SellerAnalytics";
import AdminDashboard from './pages/AdminDashboard'; 
import ManageUsers from "./pages/ManageUsers";
import ManageSellers from "./pages/ManageSellers";
import AdminOrders from "./pages/AdminOrders";
import AdminAnalytics from "./pages/AdminAnalytics";







const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="books" element={<Books />} /> 
        <Route path="books/:id" element={<BookDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="orders" element={<Orders />} /> 
        <Route path="orders" element={<OrderHistory />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/seller/orders" element={<SellerOrders />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/seller-books" element={<SellerBooks />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book/:id" element={<EditBook />} />
        <Route path="/seller-analytics" element={<SellerAnalytics />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />  
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/sellers" element={<ManageSellers />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin-analytics" element={<AdminAnalytics />} />




        
      </Route>
    </Routes>
  );
};

export default App;



