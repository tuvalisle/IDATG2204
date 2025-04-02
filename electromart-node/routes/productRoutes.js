const express = require('express');
const router = express.Router();

// Assuming productController is imported from controllers/productController.js
const productController = require('../controllers/productController');

// Define the routes with the correct handler functions
router.get('/', productController.getProducts);  // `getProducts` should be a function
router.post('/', productController.addProduct);  // `addProduct` should be a function

module.exports = router;
