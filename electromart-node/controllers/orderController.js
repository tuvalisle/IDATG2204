// // // const db = require('../db');  // Assuming your DB connection is here

// // // // Place a new order
// // // exports.createOrder = (req, res) => {
// // //   const { user_id, products } = req.body;  // products should be an array of { product_id, quantity }

// // //   // Calculate total amount
// // //   let totalAmount = 0;
// // //   const orderItems = [];

// // //   // Get the price of each product and calculate subtotal
// // //   products.forEach((product, index) => {
// // //     db.query('SELECT price FROM products WHERE product_id = ?', [product.product_id], (err, results) => {
// // //       if (err) {
// // //         return res.status(500).json({ error: 'Error fetching product price' });
// // //       }

// // //       const price = results[0]?.price;
// // //       const subtotal = price * product.quantity;
// // //       totalAmount += subtotal;

// // //       orderItems.push({ product_id: product.product_id, quantity: product.quantity, subtotal });

// // //       // After processing all products, insert the order
// // //       if (orderItems.length === products.length) {
// // //         // Insert into orders table
// // //         db.query('INSERT INTO orders (user_id, total_amount) VALUES (?, ?)', [user_id, totalAmount], (err, result) => {
// // //           if (err) {
// // //             return res.status(500).json({ error: 'Error creating order' });
// // //           }

// // //           const order_id = result.insertId; // The ID of the newly created order

// // //           // Insert items into orderitem table
// // //           const values = orderItems.map(item => [order_id, item.product_id, item.quantity, item.subtotal]);
// // //           db.query('INSERT INTO orderitem (order_id, product_id, quantity, subtotal) VALUES ?', [values], (err) => {
// // //             if (err) {
// // //               return res.status(500).json({ error: 'Error creating order items' });
// // //             }

// // //             res.status(201).json({ message: 'Order placed successfully', order_id });
// // //           });
// // //         });
// // //       }
// // //     });
// // //   });
// // // };

// // const db = require('../db');  // Assuming your DB connection is here

// // // Place a new order
// // exports.createOrder = (req, res) => {
// //   const { user_id, products } = req.body;  // products should be an array of { product_id, quantity }

// //   // Calculate total amount
// //   let totalAmount = 0;
// //   const orderItems = [];

// //   // Get the price of each product and calculate subtotal
// //   products.forEach((product, index) => {
// //     // Ensure product.quantity is a valid number
// //     if (!product.quantity || isNaN(product.quantity) || product.quantity <= 0) {
// //       return res.status(400).json({ error: `Invalid quantity for product ${product.product_id}` });
// //     }

// //     db.query('SELECT price FROM products WHERE product_id = ?', [product.product_id], (err, results) => {
// //       if (err) {
// //         return res.status(500).json({ error: 'Error fetching product price' });
// //       }

// //       const price = results[0]?.price;
// //       const subtotal = price * product.quantity;
// //       totalAmount += subtotal;

// //       orderItems.push({ product_id: product.product_id, quantity: product.quantity, subtotal });

// //       // After processing all products, insert the order
// //       if (orderItems.length === products.length) {
// //         // Insert into orders table
// //         db.query('INSERT INTO orders (user_id, total_amount) VALUES (?, ?)', [user_id, totalAmount], (err, result) => {
// //           if (err) {
// //             return res.status(500).json({ error: 'Error creating order' });
// //           }

// //           const order_id = result.insertId; // The ID of the newly created order

// //           // Insert items into orderitem table
// //           const values = orderItems.map(item => [order_id, item.product_id, item.quantity, item.subtotal]);
// //           db.query('INSERT INTO orderitem (order_id, product_id, quantity, subtotal) VALUES ?', [values], (err) => {
// //             if (err) {
// //               return res.status(500).json({ error: 'Error creating order items' });
// //             }

// //             res.status(201).json({ message: 'Order placed successfully', order_id });
// //           });
// //         });
// //       }
// //     });
// //   });
// // };


// // orderController.js

// const db = require('../db'); // Assuming your DB connection is here

// // Place a new order
// exports.createOrder = async (req, res) => {
//   console.log('Received request data:', req.body); // Log the incoming data
//   const { user_id, products } = req.body;

//   // Calculate total amount
//   let totalAmount = 0;
//   const orderItems = [];

//   try {
//     // Fetch product prices and calculate subtotals
//     for (const product of products) {
//       const priceQuery = `SELECT price FROM products WHERE product_id = ?`;
//       const [priceResult] = await db.promise().query(priceQuery, [product.product_id]);

//       if (priceResult.length === 0) {
//         return res.status(400).json({ error: `Product with ID ${product.product_id} not found` });
//       }

//       const price = priceResult[0].price;
//       const subtotal = price * product.quantity;
//       totalAmount += subtotal;

//       orderItems.push({ product_id: product.product_id, quantity: product.quantity, subtotal });
//     }

//     // Insert into orders table
//     const [orderResult] = await db.promise().query('INSERT INTO orders (user_id, total_amount) VALUES (?, ?)', [user_id, totalAmount]);
//     const order_id = orderResult.insertId;  // The ID of the newly created order

//     // Insert order items
//     const orderItemQuery = `INSERT INTO orderitem (order_id, product_id, quantity, subtotal) VALUES ?`;
//     const orderItemValues = orderItems.map(item => [order_id, item.product_id, item.quantity, item.subtotal]);
//     await db.promise().query(orderItemQuery, [orderItemValues]);

//     res.status(201).json({ message: 'Order placed successfully', order_id });
//   } catch (err) {
//     console.error('Error placing order:', err);
//     res.status(500).json({ error: 'Error placing order' });
//   }
// };


// orderController.js
const db = require('../db'); // Assuming your DB connection is here

// Place a new order
exports.createOrder = async (req, res) => {
  const { user_id, products } = req.body;
  if (!user_id || !products || products.length === 0) {
    return res.status(400).json({ error: 'Invalid data: user_id or products missing' });
  }

  // Calculate total amount
  let totalAmount = 0;
  const orderItems = [];

  try {
    // Fetch product prices and calculate subtotals
    for (const product of products) {
      const priceQuery = `SELECT price FROM product WHERE product_id = ?`;
      const [priceResult] = await db.promise().query(priceQuery, [product.product_id]);

      if (priceResult.length === 0) {
        console.error(`Product with ID ${product.product_id} not found`);
        return res.status(400).json({ error: `Product with ID ${product.product_id} not found` });
      }

      const price = priceResult[0].price;
      const subtotal = price * product.quantity;
      totalAmount += subtotal;

      orderItems.push({ product_id: product.product_id, quantity: product.quantity, subtotal });
    }

    // Insert into orders table
    const [orderResult] = await db.promise().query('INSERT INTO orders (user_id, total_amount) VALUES (?, ?)', [user_id, totalAmount]);
    const order_id = orderResult.insertId; // The ID of the newly created order

    // Insert order items
    const orderItemQuery = `INSERT INTO orderitem (order_id, product_id, quantity, subtotal) VALUES ?`;
    const orderItemValues = orderItems.map(item => [order_id, item.product_id, item.quantity, item.subtotal]);
    await db.promise().query(orderItemQuery, [orderItemValues]);

    res.status(201).json({ message: 'Order placed successfully', order_id });
  } catch (err) {
    console.error('Error placing order:', err); // Log the error for debugging
    res.status(500).json({ error: 'Error placing order' });
  }
};
