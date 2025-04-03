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
// import CreateOrder from './pages/CreateOrder'; // Import CreateOrder component

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [user, setUser] = useState(null); // Track logged-in user

  // Fetch products when the component mounts
  useEffect(() => {
    fetch('http://localhost:8080/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Function to handle adding a product to the cart
  // const addToCart = (product) => {
  //   setCart((prevCart) => [...prevCart, product]); // Add product to cart
  // };
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((item) => item.product_id === product.product_id);
  
      if (existingProductIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1; // Increment the quantity
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];  // Initialize quantity as 1
      }
    });
  };

  // Log out function
  const logOut = () => {
    setIsLoggedIn(false);
    setUser(null); // Reset the user information
    setCart([]); // Optionally, clear the cart on logout
  };


  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} user={user} logOut={logOut} cart={cart} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage products={products} addToCart={addToCart} />}/>
        <Route path="/cart" element={<CartPage cart={cart} userId={user?.user_id} />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        {/* {isLoggedIn && (
            <Route
              path="/create-order"
              element={<CreateOrder cart={cart} userId={user?.user_id} />}
            />
          )} */}
      </Routes>
    </Router>
  );
}

export default App;
