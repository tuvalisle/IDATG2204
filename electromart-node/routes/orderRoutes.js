const express = require('express');
const router = express.Router();

// Assuming orderController is imported from controllers/orderController.js
const orderController = require('../controllers/orderController');

// Define the routes with the correct handler functions
router.post('/', orderController.createOrder);   // `createOrder` should be a function
// router.get('/', orderController.getOrders);      // `getOrders` should be a function
router.get('/history', orderController.getUserOrders);
router.delete('/:order_id', orderController.deleteOrder);
// In your orderRoutes.js, add a simple console log to check if the route is being hit
// router.delete('/:order_id', (req, res, next) => {
//     console.log('DELETE request received for order ID:', req.params.order_id);
//     next();  // Call the next middleware (your deleteOrder function)
// }, orderController.deleteOrder);
  
module.exports = router;
