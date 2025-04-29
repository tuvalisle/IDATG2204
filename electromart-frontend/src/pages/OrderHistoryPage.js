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
              <p>Status: {order.status}</p>
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
                    <tr key={`${order.order_id}-${item.product_id}`}>
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
