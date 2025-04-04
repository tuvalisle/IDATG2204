// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = ({ isLoggedIn, user, logOut, cart }) => {
//   const cartCount = Array.isArray(cart) ? cart.length : 0;

//   return (
//     <nav>
//       <h2>ElectroMart</h2>
//       <ul>
//         {!isLoggedIn ? (
//           <>
//             <li><Link to="/login">Login</Link></li>
//             <li><Link to="/register">Register</Link></li>
//           </>
//         ) : (
//           <>
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/products">Products</Link></li>
//             <li><Link to="/cart">Cart ({cartCount})</Link></li>
//             <li><Link to="/order-history">Your Orders</Link></li>
//             {/* <li><Link to="/cart">Cart</Link></li> */}
//             <li><span>Welcome, {user?.first_name || 'User'}!</span></li>
//             <li><button onClick={logOut}>Log Out</button></li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, user, logOut }) => {
  // Load cart from localStorage on page load
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);

  // Update cart in state whenever the cart changes in localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []); // Empty dependency array means this runs only once after component mount

  const cartCount = cart.length;  // Count items in the cart

  return (
    <nav>
      <h2>ElectroMart</h2>
      <ul>
        {!isLoggedIn ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/order-history">Your Orders</Link></li>
            <li><span>Welcome, {user?.first_name || 'User'}!</span></li>
            <li><button onClick={logOut}>Log Out</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
