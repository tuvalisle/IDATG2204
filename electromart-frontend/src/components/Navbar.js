// export default Navbar;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import ElectroMartLogo from "../assets/ElectroMartLogo.png";

const Navbar = ({ isLoggedIn, user, logOut }) => {
  // Load cart from localStorage on page load
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const userId = localStorage.getItem("user_id");
  // Update cart in state whenever the cart changes in localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []); // Empty dependency array means this runs only once after component mount

  return (
    <nav className="navbar">
    <img src={ElectroMartLogo} alt="ElectroMart Logo" className="logo" />

    {userId && (
      <div className="nav-main">
        <ul className="nav-links">
          <li className="nav-item"><Link to="/">Home</Link></li>
          <li className="nav-item"><Link to="/products">Products</Link></li>
          <li className="nav-item"><Link to="/cart">Cart</Link></li>
          <li className="nav-item"><Link to="/order-history">Your Orders</Link></li>
        </ul>
        <div className="logout-container">
          <button onClick={() => {
            localStorage.removeItem("user_id");
            localStorage.removeItem("user_name");
            logOut();
          }}>Log Out</button>
        </div>
      </div>
    )}
  </nav>
  );
}

export default Navbar;

