const db = require('../db');  // Assuming you have your DB connection here

// Get all products
exports.getProducts = (req, res) => {
  db.query('SELECT * FROM Products', (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    // Respond with the products
    res.json(results);
  });
};

// Add a new product (ensure it's a function)
exports.addProduct = (req, res) => {
    // Simulate adding a product (replace with database insertion logic)
    const newProduct = req.body;
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  };