import React, { useState, useEffect } from 'react';
// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // Initialize cart as an empty array

    // Fetch products when the component mounts
    useEffect(() => {
      fetch('http://localhost:8080/products')
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error('Error fetching products:', error));
    }, []);
  
    // Function to handle adding a product to the cart
    const addToCart = (product) => {
      setCart((prevCart) => [...prevCart, product]); // Add product to cart
    };


  return (
    <Router>
      <Navbar cart={cart} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage products={products} addToCart={addToCart} />}/>
        <Route path="/cart" element={<CartPage cart={cart} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
