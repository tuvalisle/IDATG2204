// // CartPage.js

// import React from 'react';
// import axios from 'axios';

// function CartPage({ cart }) {
//     const userId = localStorage.getItem("user_id");

//     // You can now use userId in your component or when making API requests
//     console.log("User ID from localStorage:", userId);

//     console.log("User ID:", userId);  // Check if userId is passed correctly

//   // Calculate the total price from the cart
//   const getTotalPrice = () => {
//     if (!Array.isArray(cart) || cart.length === 0) {
//       return '0.00'; // Return 0 if cart is empty or invalid
//     }

//     const total = cart.reduce((total, item) => {
//       // Ensure price and quantity are valid
//       const price = parseFloat(item.price);  // Convert price to a number
//       const quantity = parseInt(item.quantity);  // Convert quantity to an integer

//       if (isNaN(price) || isNaN(quantity)) {
//         console.error('Invalid price or quantity for item:', item);
//         return total; // Skip this item if price or quantity is invalid
//       }

//       return total + price * quantity;
//     }, 0);

//     return total.toFixed(2); // Format the total as 2 decimal places
//   };

//   const handleCreateOrder = () => {
//     console.log("Create order button clicked!"); // Debugging log
    
//     // Prepare the products array from the cart
//     const products = cart.map(item => ({
//       product_id: item.product_id,
//       quantity: item.quantity,
//     }));
  
//     // Log the request data to confirm it's being prepared correctly
//     console.log("Request data:", { user_id: userId, products });
  
//     // Make a POST request to create the order
//     axios
//       .post('http://localhost:8080/orders', { user_id: userId, products })
//       .then((response) => {
//         alert('Order placed successfully!');
//         console.log('Order created:', response.data);
//       })
//       .catch((err) => {
//         console.error('Error placing order:', err);
//         alert('Error placing order');
//       });
//   };
  
//   return (
//     <div>
//       <h1>Your Cart</h1>
//       {cart && cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div>
//           <ul>
//             {cart.map((item, index) => (
//               <li key={index}>
//                 {item.name} - ${item.price} x {item.quantity} = ${parseFloat(item.price) * parseInt(item.quantity)}
//               </li>
//             ))}
//           </ul>
//           <p>Total Price: ${getTotalPrice()}</p>

//           {/* Create Order Button */}
//           <button onClick={handleCreateOrder}>Create Order</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CartPage;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CartPage() {
  // Get user_id from localStorage
  const userId = localStorage.getItem('user_id');
  
  // Initialize state for the cart
  const [cart, setCart] = useState([]);

  // Fetch cart from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart); // Set cart state from localStorage
  }, []);

  // Calculate total price from the cart
  const getTotalPrice = () => {
    if (!Array.isArray(cart) || cart.length === 0) {
      return '0.00'; // Return 0 if cart is empty
    }

    const total = cart.reduce((total, item) => {
      const price = parseFloat(item.price);  // Ensure price is a number
      const quantity = parseInt(item.quantity);  // Ensure quantity is an integer

      if (isNaN(price) || isNaN(quantity)) {
        console.error('Invalid price or quantity for item:', item);
        return total;
      }

      return total + price * quantity;
    }, 0);

    return total.toFixed(2); // Format the total as 2 decimal places
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
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price} x {item.quantity} = ${parseFloat(item.price) * parseInt(item.quantity)}
              </li>
            ))}
          </ul>
          <p>Total Price: ${getTotalPrice()}</p>

          {/* Create Order Button */}
          <button onClick={handleCreateOrder}>Create Order</button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
