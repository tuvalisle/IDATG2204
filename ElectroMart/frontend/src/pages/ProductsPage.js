// import React from "react";

// function ProductsPage() {
//   return (
//     <div>
//       <h1>Products</h1>
//       <p>Here you will find all our products.</p>
//     </div>
//   );
// }

// export default ProductsPage;

import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("useEffect is running");
    // Fetching products from the Flask backend
    axios
      .get("http://localhost:5000/products")  // Assuming Flask runs on this URL
      .then(response => {
        console.log("API Response:", response.data);  // Logs API response
        setProducts(response.data);
      })
      .catch(error => {
        setError("Failed to load products");
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {error && <p>{error}</p>}
      <ul>
        {products.map(product => (
          <li key={product.product_id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsPage;