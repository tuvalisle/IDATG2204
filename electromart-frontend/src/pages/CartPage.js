// // // // CartPage.js

// // // import React from 'react';
// // // import axios from 'axios';

// // // function CartPage({ cart }) {
// // //     const userId = localStorage.getItem("user_id");

// // //     // You can now use userId in your component or when making API requests
// // //     console.log("User ID from localStorage:", userId);

// // //     console.log("User ID:", userId);  // Check if userId is passed correctly

// // //   // Calculate the total price from the cart
// // //   const getTotalPrice = () => {
// // //     if (!Array.isArray(cart) || cart.length === 0) {
// // //       return '0.00'; // Return 0 if cart is empty or invalid
// // //     }

// // //     const total = cart.reduce((total, item) => {
// // //       // Ensure price and quantity are valid
// // //       const price = parseFloat(item.price);  // Convert price to a number
// // //       const quantity = parseInt(item.quantity);  // Convert quantity to an integer

// // //       if (isNaN(price) || isNaN(quantity)) {
// // //         console.error('Invalid price or quantity for item:', item);
// // //         return total; // Skip this item if price or quantity is invalid
// // //       }

// // //       return total + price * quantity;
// // //     }, 0);

// // //     return total.toFixed(2); // Format the total as 2 decimal places
// // //   };

// // //   const handleCreateOrder = () => {
// // //     console.log("Create order button clicked!"); // Debugging log
    
// // //     // Prepare the products array from the cart
// // //     const products = cart.map(item => ({
// // //       product_id: item.product_id,
// // //       quantity: item.quantity,
// // //     }));
  
// // //     // Log the request data to confirm it's being prepared correctly
// // //     console.log("Request data:", { user_id: userId, products });
  
// // //     // Make a POST request to create the order
// // //     axios
// // //       .post('http://localhost:8080/orders', { user_id: userId, products })
// // //       .then((response) => {
// // //         alert('Order placed successfully!');
// // //         console.log('Order created:', response.data);
// // //       })
// // //       .catch((err) => {
// // //         console.error('Error placing order:', err);
// // //         alert('Error placing order');
// // //       });
// // //   };
  
// // //   return (
// // //     <div>
// // //       <h1>Your Cart</h1>
// // //       {cart && cart.length === 0 ? (
// // //         <p>Your cart is empty.</p>
// // //       ) : (
// // //         <div>
// // //           <ul>
// // //             {cart.map((item, index) => (
// // //               <li key={index}>
// // //                 {item.name} - ${item.price} x {item.quantity} = ${parseFloat(item.price) * parseInt(item.quantity)}
// // //               </li>
// // //             ))}
// // //           </ul>
// // //           <p>Total Price: ${getTotalPrice()}</p>

// // //           {/* Create Order Button */}
// // //           <button onClick={handleCreateOrder}>Create Order</button>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default CartPage;


// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // function CartPage() {
// //   // Get user_id from localStorage
// //   const userId = localStorage.getItem('user_id');
  
// //   // Initialize state for the cart
// //   const [cart, setCart] = useState([]);

// //   // Fetch cart from localStorage on component mount
// //   useEffect(() => {
// //     const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
// //     setCart(storedCart); // Set cart state from localStorage
// //   }, []);

// //   // Calculate total price from the cart
// //   const getTotalPrice = () => {
// //     if (!Array.isArray(cart) || cart.length === 0) {
// //       return '0.00'; // Return 0 if cart is empty
// //     }

// //     const total = cart.reduce((total, item) => {
// //       const price = parseFloat(item.price);  // Ensure price is a number
// //       const quantity = parseInt(item.quantity);  // Ensure quantity is an integer

// //       if (isNaN(price) || isNaN(quantity)) {
// //         console.error('Invalid price or quantity for item:', item);
// //         return total;
// //       }

// //       return total + price * quantity;
// //     }, 0);

// //     return total.toFixed(2); // Format the total as 2 decimal places
// //   };

// //   // Handle creating the order
// //   const handleCreateOrder = () => {
// //     console.log('Create order button clicked!'); // Debugging log

// //     // Prepare the products array from the cart
// //     const products = cart.map(item => ({
// //       product_id: item.product_id,
// //       quantity: item.quantity,
// //     }));

// //     console.log('Request data:', { user_id: userId, products });

// //     // Make a POST request to create the order
// //     axios
// //       .post('http://localhost:8080/orders', { user_id: userId, products })
// //       .then((response) => {
// //         alert('Order placed successfully!');
// //         console.log('Order created:', response.data);
        
// //         // Clear the cart after order is placed
// //         setCart([]); // Clear cart state
// //         localStorage.removeItem('cart'); // Clear cart from localStorage
// //       })
// //       .catch((err) => {
// //         console.error('Error placing order:', err);
// //         alert('Error placing order');
// //       });
// //   };

// //   return (
// //     <div class='cart-wrapper'>
// //       <h1>Your Cart</h1>
// //       {cart.length === 0 ? (
// //         <p>Your cart is empty.</p>
// //       ) : (
// //         <div>
// //           <ul>
// //             {cart.map((item, index) => (
// //               <li key={index}>
// //                 {item.name} - ${item.price} x {item.quantity} = ${parseFloat(item.price) * parseInt(item.quantity)}
// //               </li>
// //             ))}
// //           </ul>
// //           <p>Total Price: ${getTotalPrice()}</p>

// //           {/* Create Order Button */}
// //           <button onClick={handleCreateOrder}>Create Order</button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default CartPage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function CartPage() {
//   const [cart, setCart] = useState([]);

//   // Get cart from localStorage (if it exists)
//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
//     setCart(storedCart);
//   }, []);

//   // Calculate the total price of all items in the cart
//   const getTotalPrice = () => {
//     return cart
//       .reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0)
//       .toFixed(2);  // Ensure the total is calculated as a number
//   };

//   // Handle quantity change
//   const handleQuantityChange = (productId, newQuantity) => {
//     const updatedCart = cart.map(item =>
//       item.product_id === productId
//         ? { ...item, quantity: newQuantity }
//         : item
//     );
//     setCart(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));  // Save to localStorage
//   };

//   // Handle removing an item from the cart
//   const handleRemoveItem = (productId) => {
//     const updatedCart = cart.filter(item => item.product_id !== productId);
//     setCart(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));  // Save to localStorage
//   };

//   // Handle clearing the entire cart
//   const handleClearCart = () => {
//     setCart([]);
//     localStorage.removeItem('cart');
//   };

//   // Handle checkout
//   const handleCheckout = () => {
//     alert('Proceeding to checkout...');
//   };

//   return (
//     <div className="cart-page">
//       <h1>Your Cart</h1>
//       {cart.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <div>
//           <table className="cart-table">
//             <thead>
//               <tr>
//                 <th>Product Name</th>
//                 <th>Price</th>
//                 <th>Quantity</th>
//                 <th>Total</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cart.map((item) => (
//                 <tr key={item.product_id}>
//                   <td>{item.name}</td>
//                   <td>${parseFloat(item.price).toFixed(2)}</td> {/* Ensure the price is treated as a number */}
//                   <td>
//                     <input
//                       type="number"
//                       value={item.quantity}
//                       min="1"
//                       onChange={(e) => handleQuantityChange(item.product_id, e.target.value)}
//                     />
//                   </td>
//                   <td>${(parseFloat(item.price) * item.quantity).toFixed(2)}</td> {/* Convert to number */}
//                   <td>
//                     <button onClick={() => handleRemoveItem(item.product_id)}>Remove</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div className="cart-footer">
//             <p>Total Price: ${getTotalPrice()}</p>
//             <button onClick={handleClearCart}>Clear Cart</button>
//             <button onClick={handleCheckout}>Checkout</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CartPage;


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

  // return (
  //   <div className="cart-page">
  //     <h1>Your Cart</h1>
  //     {cart.length === 0 ? (
  //       <p>Your cart is empty</p>
  //     ) : (
  //       <div>
  //         <table className="cart-table">
  //           <thead>
  //             <tr>
  //               <th>Product Name</th>
  //               <th>Price</th>
  //               <th>Quantity</th>
  //               <th>Total</th>
  //               <th>Action</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {cart.map((item) => (
  //               <tr key={item.product_id}>
  //                 <td>{item.name}</td>
  //                 <td>${parseFloat(item.price).toFixed(2)}</td> {/* Ensure the price is treated as a number */}
  //                 <td>
  //                   <input
  //                     type="number"
  //                     value={item.quantity}
  //                     min="1"
  //                     onChange={(e) => handleQuantityChange(item.product_id, e.target.value)}
  //                   />
  //                 </td>
  //                 <td>${(parseFloat(item.price) * item.quantity).toFixed(2)}</td> {/* Convert to number */}
  //                 <td>
  //                   <button onClick={() => handleRemoveItem(item.product_id)}>Remove</button>
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //         <div className="cart-footer">
  //           <p>Total Price: ${getTotalPrice()}</p>
  //           <button onClick={handleClearCart}>Clear Cart</button>
  //           <button onClick={handleCreateOrder}>Create Order</button> {/* Create Order Button */}
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );

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
                    <button class='remove-btn' onClick={() => handleRemoveItem(item.product_id)}>x</button>
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
