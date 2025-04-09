// // OrderHistoryPage.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function OrderHistoryPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Get user_id from localStorage
//   const userId = localStorage.getItem('user_id');

//   useEffect(() => {
//     if (!userId) {
//       // alert('You must be logged in to view your orders');
//       return;
//     }

//     // Send the user_id with the request to fetch orders
//     axios
//       .get('http://localhost:8080/orders/history', {
//         params: { user_id: userId },  // Sending user_id in the query params
//       })
//       .then((response) => {
//         setOrders(response.data);  // Update the state with the orders
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching orders:', error);
//         alert('Error fetching orders');
//         setLoading(false);
//       });
//   }, [userId]); // Run useEffect when userId changes

//   return (
//     <div class='history-wrapper'>
//       <h1>Your Orders</h1>

//       {loading ? (
//         <p>Loading your orders...</p>
//       ) : orders.length === 0 ? (
//         <p>You have no orders yet.</p>
//       ) : (
//         <div class='history-item'>
//           {orders.map((order) => (
//             <div key={order.order_id} className="order">
//               <h3>Order #{order.order_id}</h3>
//               <p>Status: {order.status}</p>
//               <p>Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
//               <p>Total Amount: ${order.total_amount}</p>
//               <h4>Items:</h4>
//               <ul>
//                 {order.items.map((item) => (
//                   <li key={item.order_item_id}>
//                     <strong>{item.product_name}</strong> - ${item.product_price} x {item.quantity} = ${item.subtotal}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default OrderHistoryPage;


// OrderHistoryPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-CA');  // 'en-CA' gives the format YYYY-MM-DD
};

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch the user's orders (you can modify this URL if needed)
    axios.get('http://localhost:8080/orders/history?user_id=' + localStorage.getItem('user_id'))
      .then(response => {
        setOrders(response.data);  // Assuming the response contains orders array
      })
      .catch(err => {
        console.error("Error fetching order history", err);
      });
  }, []);

  // Handle order deletion
  // const handleDeleteOrder = (order_id) => {
  //   // Confirm if the user really wants to delete the order
  //   if (window.confirm('Are you sure you want to delete this order?')) {
  //     // Make DELETE request to the backend
  //     axios
  //       .delete(`http://localhost:8080/orders/${order_id}`)
  //       .then((response) => {
  //         // Remove deleted order from state
  //         setOrders(orders.filter(order => order.order_id !== order_id));
  //       })
  //       .catch((err) => {
  //         console.error('Error deleting order', err);
  //         alert('Error deleting order');
  //       });
  //   }
  // };

  const handleDeleteOrder = (order_id) => {
    axios
      .delete(`http://localhost:8080/orders/${order_id}`)
      .then((response) => {
        console.log('Order deleted successfully:', response.data);
        // Remove the order from the UI
        setOrders(orders.filter((order) => order.order_id !== order_id));
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          alert(err.response.data.error);  // Show the error message returned by the server
        } else {
          console.error('Error deleting order:', err);
        }
      });
  };


  return (
    <div className="order-history-container">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className='history-wrapper'>
          {orders.map((order) => (
            <div key={order.order_id} className="order-card">
              <h3>Order #{order.order_id} - {formatDate(order.order_date)}</h3>
              <td>Status: {order.status}</td>
              <table className="order-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.order_item_id}>
                      <td>{item.product_name}</td>
                      <td>${item.product_price}</td>
                      <td>{item.quantity}</td>
                      <td>${item.subtotal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="order-total">
                <strong>Total: ${order.total_amount}</strong>
              </div>
              {/* Add the delete button here */}
              <button onClick={() => handleDeleteOrder(order.order_id)} className="btn-delete">
                Delete Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistoryPage;
