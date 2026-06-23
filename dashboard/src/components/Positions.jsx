import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "../../src/index.css";
import { useAuth } from "../context/AuthContext";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAuthHeader } = useAuth();

  useEffect(() => {
    axios
      .get("http://localhost:5000/positions", { headers: getAuthHeader() })
      .then((res) => {
        setPositions(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch positions:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
        <p style={{ color: "#9ca3af" }}>Loading positions...</p>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((stock, index) => {
              const total = stock.price * stock.qty;
              const isProfit = total - stock.avg * stock.qty >= 0;
              const profclass = isProfit ? "profit" : "loss";
              const dayclass = stock.isDown ? "down" : "up";
              return (
                <tr key={index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td className={profclass}>
                    {(total - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={dayclass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
