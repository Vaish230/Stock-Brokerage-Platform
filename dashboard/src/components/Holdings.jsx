import { React, useEffect, useState } from "react";
import "../../src/index.css";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import { useAuth } from "../context/AuthContext";

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAuthHeader } = useAuth();

  useEffect(() => {
    axios
      .get("http://localhost:5000/holdings", { headers: getAuthHeader() })
      .then((res) => {
        setHoldings(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch holdings:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Dynamic totals computed from real data
  const totalInvestment = holdings.reduce(
    (sum, s) => sum + s.avg * s.qty,
    0
  );
  const totalCurrentValue = holdings.reduce(
    (sum, s) => sum + s.price * s.qty,
    0
  );
  const totalPnL = totalCurrentValue - totalInvestment;
  const pnlPercent =
    totalInvestment > 0
      ? ((totalPnL / totalInvestment) * 100).toFixed(2)
      : 0;
  const isProfitable = totalPnL >= 0;

  const labels = holdings.map((s) => s.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: holdings.map((s) => s.price),
        backgroundColor: "rgba(245, 104, 52, 0.5)",
        borderColor: "rgba(245, 104, 52, 0.8)",
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
        <p style={{ color: "#9ca3af" }}>Loading holdings...</p>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((stock, index) => {
              const currentVal = stock.price * stock.qty;
              const pnl = currentVal - stock.avg * stock.qty;
              const profclass = pnl >= 0 ? "profit" : "loss";
              const dayclass = stock.isDown ? "down" : "up";
              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{currentVal.toFixed(2)}</td>
                  <td className={profclass}>{pnl.toFixed(2)}</td>
                  <td className={dayclass}>{stock.net}</td>
                  <td className={dayclass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {holdings.length > 0 && (
        <div className="row">
          <div className="col">
            <h5>
              {totalInvestment.toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
            </h5>
            <p>Total investment</p>
          </div>
          <div className="col">
            <h5>
              {totalCurrentValue.toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
            </h5>
            <p>Current value</p>
          </div>
          <div className="col">
            <h5 className={isProfitable ? "profit" : "loss"}>
              {isProfitable ? "+" : ""}
              {totalPnL.toLocaleString("en-IN", { maximumFractionDigits: 2 })}{" "}
              ({isProfitable ? "+" : ""}
              {pnlPercent}%)
            </h5>
            <p>P&L</p>
          </div>
        </div>
      )}

      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
