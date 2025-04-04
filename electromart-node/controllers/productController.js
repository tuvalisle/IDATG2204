const db = require('../db');

// Get all products with optional filtering
exports.getProducts = (req, res) => {
  const { brand_id, category_id } = req.query;  // Get brand_id and category_id from query params

  let query = `
    SELECT p.product_id, p.name, p.description, p.price, p.stock_quantity, 
           b.brand_name, c.category_name
    FROM product p
    LEFT JOIN brand b ON p.brand_id = b.brand_id
    LEFT JOIN category c ON p.category_id = c.category_id
  `;

  const queryParams = [];
  if (brand_id) {
    query += ' WHERE p.brand_id = ?';
    queryParams.push(brand_id);
  }

  if (category_id) {
    if (queryParams.length > 0) {
      query += ' AND p.category_id = ?';
    } else {
      query += ' WHERE p.category_id = ?';
    }
    queryParams.push(category_id);
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ error: 'Error fetching products' });
    }
    res.status(200).json(results);
  });
};

// Get all brands
exports.getBrands = (req, res) => {
  db.query('SELECT * FROM brand', (err, results) => {
    if (err) {
      console.error('Error fetching brands:', err);
      return res.status(500).json({ error: 'Error fetching brands' });
    }
    res.status(200).json(results);
  });
};

// Get all categories
exports.getCategories = (req, res) => {
  db.query('SELECT * FROM category', (err, results) => {
    if (err) {
      console.error('Error fetching categories:', err);
      return res.status(500).json({ error: 'Error fetching categories' });
    }
    res.status(200).json(results);
  });
};


// Add a new product (ensure it's a function)
exports.addProduct = (req, res) => {
    // Simulate adding a product (replace with database insertion logic)
    const newProduct = req.body;
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  };