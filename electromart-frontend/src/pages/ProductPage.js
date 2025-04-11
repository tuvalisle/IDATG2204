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

  // Handle brand click (instead of a dropdown)
  const handleBrandClick = (brandId) => {
    if (brandId === selectedBrand) {
      setSelectedBrand(''); // Remove filter if it's already selected
    } else {
      setSelectedBrand(brandId);
    }
  };

  // Handle category click (instead of a dropdown)
  const handleCategoryClick = (categoryId) => {
    if (categoryId === selectedCategory) {
      setSelectedCategory(''); // Remove filter if it's already selected
    } else {
      setSelectedCategory(categoryId);
    }
  };

  // Add product to the cart
  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(item => item.product_id === product.product_id);
  
    let updatedCart;
  
    if (existingProductIndex !== -1) {
      updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;  // Increment quantity
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
  
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));  // Save to localStorage
  };

  return (
    <div className="main-container">
      {/* Filters Section */}
      <div className="filters">
        <h3>Brands</h3>
        <span className={selectedBrand === '' ? 'filter' : 'filter selected'} onClick={() => setSelectedBrand('')}>
          All Brands
        </span>
        {brands.map((brand) => (
          <span
            key={brand.brand_id}
            className={selectedBrand === brand.brand_id ? 'filter selected' : 'filter'}
            onClick={() => handleBrandClick(brand.brand_id)}>
            {brand.brand_name}
          </span>
        ))}

        <h3>Categories</h3>
        <span className={selectedCategory === '' ? 'filter' : 'filter selected'} onClick={() => setSelectedCategory('')}>
          All Categories
        </span>
        {categories.map((category) => (
          <span
            key={category.category_id}
            className={selectedCategory === category.category_id ? 'filter selected' : 'filter'}
            onClick={() => handleCategoryClick(category.category_id)}>
            {category.category_name}
          </span>
        ))}
      </div>

      {/* Products Section */}
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
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
