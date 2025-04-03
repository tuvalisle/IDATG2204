const express = require('express');
const router = express.Router();

// Assuming orderController is imported from controllers/orderController.js
const orderController = require('../controllers/orderController');

// Define the routes with the correct handler functions
router.post('/', orderController.createOrder);   // `createOrder` should be a function
// router.get('/', orderController.getOrders);      // `getOrders` should be a function

module.exports = router;
