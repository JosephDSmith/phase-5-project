import React, { useState, useEffect } from "react";

function Orders({ fetchUser, user }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []); // This effect runs only once, similar to componentDidMount

  useEffect(() => {
    fetch(`/api/orders`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [user.id]); // Fetch orders when user_id changes

  // Filter orders based on user_id
  const userOrders = orders.filter((order) => order.user_id === user.id);

  return (
    <div className="orders-container">
      <h2>Order History</h2>
      <ul>
        {userOrders.map((order, idx) => (
          <li key={idx}>
            Order ID: {order.id} - Total Items: {order.total_items} - Total Price: ${order.total_price}
            {/* Display other order details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;
