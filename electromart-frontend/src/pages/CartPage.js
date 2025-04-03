import React from 'react';

function CartPage({ cart }) {
  // Ensure that reduce always returns a valid number (0 if the cart is empty)
  const getTotalPrice = () => {
    // Check if cart is valid and if it contains items
    if (!Array.isArray(cart)) {
      return '0.00';
    }

    const total = cart.reduce((total, item) => {
      // Ensure item.price is a valid number, fallback to 0 if not
      const price = parseFloat(item.price) || 0;
      return total + price;
    }, 0);

    return total.toFixed(2); // Format as 2 decimal places
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart && cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
          <p>Total Price: ${getTotalPrice()}</p> {/* Display total price */}
        </div>
      )}
    </div>
  );
}

export default CartPage;
