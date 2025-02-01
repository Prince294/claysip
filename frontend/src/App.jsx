import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify";
import Sidebar from "./components/Sidebar";
import Loader from "./pages/Loader";
import { ShopContext } from "./context/ShopContext";
import ForgotPassword from "./pages/ForgotPassword";
import ShippingPolicy from "./pages/ShippingPolicy";

const App = () => {
  const { isLoading } = useContext(ShopContext);

  return (
    <>
      <Loader open={isLoading} />
      <Navbar />
      <div className="mt-[90px]">
        <ToastContainer />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/policy" element={<ShippingPolicy />} />
          {/* <Route path='/verify' element={<Verify />} /> */}
          <Route
            path="*"
            element={<Navigate to="/" replace={true} />}
          />
        </Routes>
        <Footer />
      </div>
      <Sidebar />
    </>
  );
};

export default App;
