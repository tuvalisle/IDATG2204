// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function ProductsPage() {
//   const [products, setProducts] = useState([]);  // To store the list of products
//   const [cart, setCart] = useState([]);          // To store the cart items
//   const [error, setError] = useState(null);

//   // Fetch products from the backend when the component mounts
//   useEffect(() => {
//     axios
//       .get('http://localhost:8080/products') // Update with correct endpoint
//       .then((response) => {
//         setProducts(response.data);  // Assuming response data is an array of products
//       })
//       .catch((err) => {
//         console.error('Error fetching products:', err);
//         setError('Failed to load products');
//       });
//   }, []);

//   // Function to handle adding a product to the cart
//   const addToCart = (product) => {
//     setCart((prevCart) => [...prevCart, product]);  // Add the selected product to the cart
//   };

//   return (
//     <div>
//       <h1>Products</h1>
//       {error && <p>{error}</p>}
//       <div className="product-list">
//         {products.length === 0 ? (
//           <p>Loading products...</p>
//         ) : (
//           products.map((product) => (
//             <div key={product.product_id} className="product-item">
//               <h3>{product.name}</h3>
//               <p>{product.description}</p>
//               <p>Price: ${product.price}</p>  {/* Display the product price */}
//               <button onClick={() => addToCart(product)}>Add to Cart</button>
//             </div>
//           ))
//         )}
//       </div>

//       <div className="cart-summary">
//         <h3>Cart</h3>
//         <p>Total Items: {cart.length}</p>
//         {cart.length > 0 && (
//           <ul>
//             {cart.map((item, index) => (
//               <li key={index}>
//                 {item.name} - ${item.price}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProductsPage;


import React from 'react';

function ProductsPage({ products, addToCart }) {
  return (
    <div>
      <h1>Products</h1>
      <div className="product-list">
        {products.length === 0 ? (
          <p>Loading products...</p>
        ) : (
          products.map((product) => (
            <div key={product.product_id} className="product-item">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
