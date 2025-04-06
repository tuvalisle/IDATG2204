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


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const Navbar = ({ isLoggedIn, user, logOut }) => {
//   // Load cart from localStorage on page load
//   const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);

//   // Update cart in state whenever the cart changes in localStorage
//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
//     setCart(storedCart);
//   }, []); // Empty dependency array means this runs only once after component mount

//   const cartCount = cart.length;  // Count items in the cart

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
//             <li><Link to="/cart">Cart</Link></li>
//             <li><Link to="/order-history">Your Orders</Link></li>
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
  const userId = localStorage.getItem("user_id");
  // Update cart in state whenever the cart changes in localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []); // Empty dependency array means this runs only once after component mount

  // const cartCount = cart.length;  // Count items in the cart
  // const cartCount = Array.isArray(cart) ? cart.length : 0;

  // return (
  //   <nav className="navbar">
  //     <div className="logo">ElectroMart</div>
  //     <div className="links">
  //       {isLoggedIn ? (
  //         <>
  //           <Link to="/home">Home</Link>
  //           <Link to="/products">Products</Link>
  //           <Link to="/cart">Cart</Link>
  //           <Link to="/order-history">Orders</Link>
  //           <button className="logout-button" onClick={logOut}>Log Out</button>
  //         </>
  //       ) : (
  //         <>
  //           <Link to="/login">Login</Link>
  //           <Link to="/register">Register</Link>
  //         </>
  //       )}
  //     </div>
  //   </nav>
  // );

  return (
    <nav>
      <h2 id='comp-name'>ElectroMart</h2>
      <ul>
        {/* Show login/register links if the user is not logged in */}
        {!userId ? (
          <>
          </>
        ) : (
          <>
            <li><Link to="/">Home</Link></li>
            <li class='nav-item'><Link to="/products">Products</Link></li>
            <li class='nav-item'><Link to="/cart">Cart</Link></li>
            <li class='nav-item'><Link to="/order-history">Your Orders</Link></li>
            <li><button onClick={() => {
              localStorage.removeItem("user_id");
              localStorage.removeItem("user_name");
              logOut();
            }}>Log Out</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

