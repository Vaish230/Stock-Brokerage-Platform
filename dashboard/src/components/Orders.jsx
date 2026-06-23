import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAuthHeader } = useAuth();

  useEffect(() => {
    axios
      .get("http://localhost:5000/orders", { headers: getAuthHeader() })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p style={{ color: "#9ca3af" }}>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders">
      <h3 className="title">Orders ({orders.length})</h3>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Type</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.name}</td>
                <td>
                  <p
                    style={{
                      background:
                        order.mode === "BUY"
                          ? "rgba(65, 132, 243, 0.12)"
                          : "rgba(255, 87, 34, 0.12)",
                      color: order.mode === "BUY" ? "#4184f3" : "#ff5722",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      fontWeight: 500,
                      display: "inline-block",
                      fontSize: "0.8rem",
                    }}
                  >
                    {order.mode}
                  </p>
                </td>
                <td>{order.qty}</td>
                <td>{order.price?.toFixed(2)}</td>
                <td>
                  {new Date(order.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
