const db = require('../db');  // Import the database connection

// Get all products from the database
exports.getProducts = (req, res) => {
  console.log('Fetching products...');
  // Query the database to retrieve all products
  db.query('SELECT * FROM Product', (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
    res.json(results);  // Send the results (products) as the response
  });
};


// Add a new product (ensure it's a function)
exports.addProduct = (req, res) => {
    // Simulate adding a product (replace with database insertion logic)
    const newProduct = req.body;
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  };