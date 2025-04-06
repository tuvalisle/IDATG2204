// // // // import React, { useState, useEffect } from 'react';
// // // // import axios from 'axios';

// // // // function ProductsPage() {
// // // //   const [products, setProducts] = useState([]);  // To store the list of products
// // // //   const [cart, setCart] = useState([]);          // To store the cart items
// // // //   const [error, setError] = useState(null);

// // // //   // Fetch products from the backend when the component mounts
// // // //   useEffect(() => {
// // // //     axios
// // // //       .get('http://localhost:8080/products') // Update with correct endpoint
// // // //       .then((response) => {
// // // //         setProducts(response.data);  // Assuming response data is an array of products
// // // //       })
// // // //       .catch((err) => {
// // // //         console.error('Error fetching products:', err);
// // // //         setError('Failed to load products');
// // // //       });
// // // //   }, []);

// // // //   // Function to handle adding a product to the cart
// // // //   const addToCart = (product) => {
// // // //     setCart((prevCart) => [...prevCart, product]);  // Add the selected product to the cart
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       <h1>Products</h1>
// // // //       {error && <p>{error}</p>}
// // // //       <div className="product-list">
// // // //         {products.length === 0 ? (
// // // //           <p>Loading products...</p>
// // // //         ) : (
// // // //           products.map((product) => (
// // // //             <div key={product.product_id} className="product-item">
// // // //               <h3>{product.name}</h3>
// // // //               <p>{product.description}</p>
// // // //               <p>Price: ${product.price}</p>  {/* Display the product price */}
// // // //               <button onClick={() => addToCart(product)}>Add to Cart</button>
// // // //             </div>
// // // //           ))
// // // //         )}
// // // //       </div>

// // // //       <div className="cart-summary">
// // // //         <h3>Cart</h3>
// // // //         <p>Total Items: {cart.length}</p>
// // // //         {cart.length > 0 && (
// // // //           <ul>
// // // //             {cart.map((item, index) => (
// // // //               <li key={index}>
// // // //                 {item.name} - ${item.price}
// // // //               </li>
// // // //             ))}
// // // //           </ul>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default ProductsPage;


// // // import React from 'react';

// // // function ProductsPage({ products, addToCart }) {
// // //   return (
// // //     <div>
// // //       <h1>Products</h1>
// // //       <div className="product-list">
// // //         {products.length === 0 ? (
// // //           <p>Loading products...</p>
// // //         ) : (
// // //           products.map((product) => (
// // //             <div key={product.product_id} className="product-item">
// // //               <h3>{product.name}</h3>
// // //               <p>{product.description}</p>
// // //               <p>Price: ${product.price}</p>
// // //               <button onClick={() => addToCart(product)}>Add to Cart</button>
// // //             </div>
// // //           ))
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default ProductsPage;


// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // function ProductsPage() {
// //   const [products, setProducts] = useState([]);
// //   const [brands, setBrands] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [selectedBrand, setSelectedBrand] = useState('');
// //   const [selectedCategory, setSelectedCategory] = useState('');

// //   // Fetch all products and brands/categories when the component mounts
// //   useEffect(() => {
// //     // Fetch brands and categories
// //     axios.get('http://localhost:8080/brands')
// //       .then((response) => setBrands(response.data))
// //       .catch((err) => console.error('Error fetching brands:', err));

// //     axios.get('http://localhost:8080/categories')
// //       .then((response) => setCategories(response.data))
// //       .catch((err) => console.error('Error fetching categories:', err));

// //     fetchProducts();
// //   }, [selectedBrand, selectedCategory]);

// //   // Fetch products with filters
// //   const fetchProducts = () => {
// //     axios.get('http://localhost:8080/products', {
// //       params: {
// //         brand_id: selectedBrand,
// //         category_id: selectedCategory,
// //       },
// //     })
// //     .then((response) => {
// //       setProducts(response.data);
// //     })
// //     .catch((err) => console.error('Error fetching products:', err));
// //   };

// //   // Handle filter changes
// //   const handleBrandChange = (event) => {
// //     setSelectedBrand(event.target.value);
// //   };

// //   const handleCategoryChange = (event) => {
// //     setSelectedCategory(event.target.value);
// //   };

// //   return (
// //     <div>
// //       <h1>Products</h1>

// //       <div>
// //         {/* Brand Filter */}
// //         <select onChange={handleBrandChange} value={selectedBrand}>
// //           <option value="">All Brands</option>
// //           {brands.map((brand) => (
// //             <option key={brand.brand_id} value={brand.brand_id}>
// //               {brand.name}
// //             </option>
// //           ))}
// //         </select>

// //         {/* Category Filter */}
// //         <select onChange={handleCategoryChange} value={selectedCategory}>
// //           <option value="">All Categories</option>
// //           {categories.map((category) => (
// //             <option key={category.category_id} value={category.category_id}>
// //               {category.name}
// //             </option>
// //           ))}
// //         </select>
// //       </div>

// //       <div className="product-list">
// //         {products.length === 0 ? (
// //           <p>No products found.</p>
// //         ) : (
// //           products.map((product) => (
// //             <div key={product.product_id} className="product-item">
// //               <h3>{product.name}</h3>
// //               <p>{product.description}</p>
// //               <p>Price: ${product.price}</p>
// //               <p>Brand: {product.brand_name}</p>
// //               <p>Category: {product.category_name}</p>
// //             </div>
// //           ))
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default ProductsPage;


// // ProductPage.js (Frontend)
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function ProductsPage() {
//   const [products, setProducts] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedBrand, setSelectedBrand] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');

//   useEffect(() => {
//     // Fetch brands and categories
//     axios.get('http://localhost:8080/products/brands')
//       .then((response) => setBrands(response.data))
//       .catch((err) => console.error('Error fetching brands:', err));

//     axios.get('http://localhost:8080/products/categories')
//       .then((response) => setCategories(response.data))
//       .catch((err) => console.error('Error fetching categories:', err));

//     fetchProducts();
//   }, [selectedBrand, selectedCategory]);

//   const fetchProducts = () => {
//     axios.get('http://localhost:8080/products', {
//       params: {
//         brand_id: selectedBrand,
//         category_id: selectedCategory,
//       },
//     })
//     .then((response) => {
//       setProducts(response.data);
//     })
//     .catch((err) => console.error('Error fetching products:', err));
//   };

//   const handleBrandChange = (event) => {
//     setSelectedBrand(event.target.value);
//   };

//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   return (
//     <div>
//       <h1>Products</h1>

//       <div>
//         <select onChange={handleBrandChange} value={selectedBrand}>
//           <option value="">All Brands</option>
//           {brands.map((brand) => (
//             <option key={brand.brand_id} value={brand.brand_id}>
//               {brand.brand_name}
//             </option>
//           ))}
//         </select>

//         <select onChange={handleCategoryChange} value={selectedCategory}>
//           <option value="">All Categories</option>
//           {categories.map((category) => (
//             <option key={category.category_id} value={category.category_id}>
//               {category.category_name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="product-list">
//         {products.length === 0 ? (
//           <p>No products found.</p>
//         ) : (
//           products.map((product) => (
//             <div key={product.product_id} className="product-item">
//               <h3>{product.name}</h3>
//               <p>{product.description}</p>
//               <p>Price: ${product.price}</p>
//               <p>Brand: {product.brand_name}</p>
//               <p>Category: {product.category_name}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProductsPage;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Get cart from localStorage (if it exists)
  const getCartFromStorage = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  };

  const [cart, setCart] = useState(getCartFromStorage());

  useEffect(() => {
    // Fetch brands and categories
    axios.get('http://localhost:8080/products/brands')
      .then((response) => setBrands(response.data))
      .catch((err) => console.error('Error fetching brands:', err));

    axios.get('http://localhost:8080/products/categories')
      .then((response) => setCategories(response.data))
      .catch((err) => console.error('Error fetching categories:', err));

    fetchProducts();
  }, [selectedBrand, selectedCategory]);

  // Fetch products with filters
  const fetchProducts = () => {
    axios.get('http://localhost:8080/products', {
      params: {
        brand_id: selectedBrand,
        category_id: selectedCategory,
      },
    })
    .then((response) => {
      setProducts(response.data);
    })
    .catch((err) => console.error('Error fetching products:', err));
  };

  // Handle filter changes
  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Add product to the cart
  // const addToCart = (product) => {
  //   const updatedCart = [...cart, product];
  //   setCart(updatedCart);
  //   localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save to localStorage
  // };
  // const addToCart = (product) => {
  //   // Initialize the quantity to 1 when the item is added to the cart
  //   const updatedProduct = {
  //     ...product,
  //     quantity: 1,  // Set quantity to 1 by default when adding to cart
  //   };
  
  //   // Add the product to the cart
  //   const updatedCart = [...cart, updatedProduct];
  //   setCart(updatedCart);
  //   localStorage.setItem('cart', JSON.stringify(updatedCart));  // Save the updated cart to localStorage
  // };

  const addToCart = (product) => {
    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.product_id === product.product_id);
  
    let updatedCart;
  
    if (existingProductIndex !== -1) {
      // If the product exists, increment its quantity
      updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;  // Increment quantity
    } else {
      // If it's a new product, add it to the cart with quantity 1
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
  
    // Save the updated cart to localStorage and update state
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save to localStorage
  };
  
  
  
  
  // Handle cart clearing (optional)
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <div>
      <h1>Products</h1>

      <div>
        {/* Brand Filter */}
        <select onChange={handleBrandChange} value={selectedBrand}>
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand.brand_id} value={brand.brand_id}>
              {brand.brand_name}
            </option>
          ))}
        </select>

        {/* Category Filter */}
        <select onChange={handleCategoryChange} value={selectedCategory}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>

      <div className="product-list">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <div key={product.product_id} className="product-item">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Brand: {product.brand_name}</p>
              <p>Category: {product.category_name}</p>
              {/* Add to Cart Button */}
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))
        )}
      </div>

      <div>
        <h2>Shopping Cart</h2>
        <p>{cart.length} item(s) in cart</p>
        <button onClick={clearCart}>Clear Cart</button>
      </div>
    </div>
  );
}

export default ProductsPage;
