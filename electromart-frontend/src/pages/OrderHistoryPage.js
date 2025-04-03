// OrderHistoryPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get user_id from localStorage
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (!userId) {
      alert('You must be logged in to view your orders');
      return;
    }

    // Send the user_id with the request to fetch orders
    axios
      .get('http://localhost:8080/orders/history', {
        params: { user_id: userId },  // Sending user_id in the query params
      })
      .then((response) => {
        setOrders(response.data);  // Update the state with the orders
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        alert('Error fetching orders');
        setLoading(false);
      });
  }, [userId]); // Run useEffect when userId changes

  return (
    <div>
      <h1>Your Orders</h1>

      {loading ? (
        <p>Loading your orders...</p>
      ) : orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order.order_id} className="order">
              <h3>Order #{order.order_id}</h3>
              <p>Status: {order.status}</p>
              <p>Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
              <p>Total Amount: ${order.total_amount}</p>
              <h4>Items:</h4>
              <ul>
                {order.items.map((item) => (
                  <li key={item.order_item_id}>
                    <strong>{item.product_name}</strong> - ${item.product_price} x {item.quantity} = ${item.subtotal}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistoryPage;
