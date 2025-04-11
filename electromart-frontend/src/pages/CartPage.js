import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CartPage() {
  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem('user_id'); // Assuming user_id is stored in localStorage

  // Get cart from localStorage (if it exists)
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  // Calculate the total price of all items in the cart
  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0)
      .toFixed(2);  // Ensure the total is calculated as a number
  };

  // Handle quantity change
  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cart.map(item =>
      item.product_id === productId
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));  // Save to localStorage
  };

  // Handle removing an item from the cart
  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter(item => item.product_id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));  // Save to localStorage
  };

  // Handle clearing the entire cart
  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  // Handle creating the order
  const handleCreateOrder = () => {
    console.log('Create order button clicked!'); // Debugging log

    // Prepare the products array from the cart
    const products = cart.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity,
    }));

    console.log('Request data:', { user_id: userId, products });

    // Make a POST request to create the order
    axios
      .post('http://localhost:8080/orders', { user_id: userId, products })
      .then((response) => {
        alert('Order placed successfully!');
        console.log('Order created:', response.data);
        
        // Clear the cart after order is placed
        setCart([]); // Clear cart state
        localStorage.removeItem('cart'); // Clear cart from localStorage
      })
      .catch((err) => {
        console.error('Error placing order:', err);
        alert('Error placing order');
      });
  };


  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {/* Cart table */}
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>${parseFloat(item.price).toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => handleQuantityChange(item.product_id, parseInt(e.target.value))}
                    />
                  </td>
                  <td>${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
                  <td>
                    <button className='remove-btn' onClick={() => handleRemoveItem(item.product_id)}>x</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total price row */}
          <div className="cart-total">
            <span className="total-label">Total:</span>
            <span>${getTotalPrice()}</span>
          </div>

          {/* Buttons */}
          <div className="cart-buttons">
            <button className="clear-cart-button" onClick={handleClearCart}>
              Clear Cart
            </button>
            <button className="order-button" onClick={handleCreateOrder}>
              Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
