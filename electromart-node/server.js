const express = require('express');
const cors = require('cors');
const app = express();

// Import the route files
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

// CORS options to allow requests only from localhost:3000
const corsOptions = {
  origin: 'http://localhost:3000',  // React frontend runs here
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true  // If your API requires cookies or credentials
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json());

// Use routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

const port = 8080;

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
