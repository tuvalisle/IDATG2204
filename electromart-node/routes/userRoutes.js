const express = require('express');
const router = express.Router();

// Assuming that userController.js has the correct functions defined and exported
const userController = require('../controllers/userController');

// Define the routes and make sure the handler is a function
router.post('/register', userController.register);  // `userController.register` should be a function
router.post('/login', userController.login);        // `userController.login` should be a function

module.exports = router;
