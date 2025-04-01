import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/ProductsPage";

const Home = () => <h1>Welcome to ElectroMart</h1>;
const Products = () => <h1>Here you will find all our products.</h1>;
const Orders = () => <h1>Here you can see your orders.</h1>;
const Login = () => <h1>Login to your account</h1>;

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;



