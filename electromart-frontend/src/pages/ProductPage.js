import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductsPage() {
  const [products, setProducts] = useState([]);  // State to store products
  const [error, setError] = useState(null);  // State to store error message

  useEffect(() => {
    axios
      .get("http://localhost:8080/products")  // Fetch products from backend
      .then((response) => {
        setProducts(response.data);  // Update products state with the data
      })
      .catch((error) => {
        setError("Error fetching products");  // Set error message if API call fails
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {error && <p>{error}</p>}  {/* Display error message if there's an error */}
      <ul>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <li key={product.product_id}>{product.name}</li>
          ))
        ) : (
          <p>No products available or loading...</p>  /* Show message if no products */
        )}
      </ul>
    </div>
  );
}

export default ProductsPage;
