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

// Fetch user's orders and their items
exports.getUserOrders = (req, res) => {
    const userId = req.query.user_id; // Get user_id from query params
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
  
    const query = `
      SELECT o.order_id, o.order_date, o.total_amount, o.status, 
             oi.product_id, oi.quantity, oi.subtotal, 
             p.name as product_name, p.price as product_price
      FROM orders o
      LEFT JOIN orderitem oi ON o.order_id = oi.order_id
      LEFT JOIN product p ON oi.product_id = p.product_id
      WHERE o.user_id = ?
    `;
  
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching orders and order items:', err);
        return res.status(500).json({ error: 'Error fetching orders and order items' });
      }
  
      const orders = [];
  
      results.forEach(row => {
        let order = orders.find(order => order.order_id === row.order_id);
        if (!order) {
          order = {
            order_id: row.order_id,
            order_date: row.order_date,
            total_amount: row.total_amount,
            status: row.status,
            items: [],
          };
          orders.push(order);
        }
  
      //   order.items.push({
      //     order_item_id: row.order_item_id,
      //     product_id: row.product_id,
      //     product_name: row.product_name,
      //     quantity: row.quantity,
      //     subtotal: row.subtotal,
      //     product_price: row.product_price,
      //   });

      // Add order item using only order_id and product_id as unique identifiers
        const existingItem = order.items.find(item => item.product_id === row.product_id);
        if (existingItem) {
          // If the item already exists (same product_id), we just update the quantity and subtotal
          existingItem.quantity += row.quantity;
          existingItem.subtotal += row.subtotal;
        } else {
          // Otherwise, create a new order item
          order.items.push({
            product_id: row.product_id,
            product_name: row.product_name,
            quantity: row.quantity,
            subtotal: row.subtotal,
            product_price: row.product_price,
          });
        }
      });
  
      res.status(200).json(orders); // Respond with the orders grouped by order_id
    });
};

// // Delete order
// exports.deleteOrder = (req, res) => {
//   const { order_id } = req.params;

//   // Begin a transaction to ensure both orders and orderitems are deleted
//   db.beginTransaction((err) => {
//     if (err) {
//       return res.status(500).json({ error: 'Error starting transaction' });
//     }

//     // First, delete items from the orderitem table
//     db.query('DELETE FROM orderitem WHERE order_id = ?', [order_id], (err, result) => {
//       if (err) {
//         return db.rollback(() => {
//           res.status(500).json({ error: 'Error deleting order items' });
//         });
//       }

//       // Then, delete the order from the orders table
//       db.query('DELETE FROM orders WHERE order_id = ?', [order_id], (err, result) => {
//         if (err) {
//           return db.rollback(() => {
//             res.status(500).json({ error: 'Error deleting order' });
//           });
//         }

//         // Commit the transaction
//         db.commit((err) => {
//           if (err) {
//             return db.rollback(() => {
//               res.status(500).json({ error: 'Error committing transaction' });
//             });
//           }

//           res.status(200).json({ message: 'Order and items deleted successfully' });
//         });
//       });
//     });
//   });
// };


// Delete an order and its items
exports.deleteOrder = (req, res) => {
  const orderId = req.params.order_id;

  db.query('SELECT status FROM orders WHERE order_id = ?', [orderId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error checking order status' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const orderStatus = results[0].status;

    if (orderStatus !== 'pending') {
      return res.status(400).json({ error: 'Only pending orders can be deleted.' });
    }

    // First, delete items from orderItem table
    db.query('DELETE FROM orderitem WHERE order_id = ?', [orderId], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error deleting order items' });
      }

      // Then, delete the order from the orders table
      db.query('DELETE FROM orders WHERE order_id = ?', [orderId], (err) => {
        if (err) {
          return res.status(500).json({ error: 'Error deleting order' });
        }

        // If both deletions were successful, send a success response
        res.status(200).json({ message: 'Order deleted successfully' });
      });
    });
  });
};
