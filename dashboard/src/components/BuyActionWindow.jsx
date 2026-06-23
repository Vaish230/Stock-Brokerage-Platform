import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";
import { useAuth } from "../context/AuthContext";

const BuyActionWindow = ({ uid, mode = "BUY" }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const { closeBuyWindow } = useContext(GeneralContext);
  const { getAuthHeader } = useAuth();

  const handleActionClick = () => {
    axios
      .post(
        "http://localhost:5000/newOrder",
        {
          name: uid,
          qty: stockQuantity,
          price: stockPrice,
          mode: mode,
        },
        { headers: getAuthHeader() }
      )
      .then(() => {
        closeBuyWindow();
        window.location.reload(); // Quick refresh to update holdings immediately
      })
      .catch((err) => {
        console.error("Order failed:", err);
        closeBuyWindow();
      });
  };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  const isBuy = mode === "BUY";

  return (
    <div className="container" id="buy-window" draggable="true" style={isBuy ? {} : { borderTop: "4px solid #ea5353" }}>
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹{(stockPrice * stockQuantity * 0.2).toFixed(2)}</span>
        <div>
          <Link className={`btn ${isBuy ? "btn-blue" : "btn-red"}`} style={isBuy ? {} : { backgroundColor: "#ea5353", color: "white" }} onClick={handleActionClick}>
            {isBuy ? "Buy" : "Sell"}
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
