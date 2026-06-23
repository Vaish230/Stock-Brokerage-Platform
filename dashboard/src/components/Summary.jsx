import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Summary = () => {
  const { user, getAuthHeader } = useAuth();
  const firstName = user?.name?.split(" ")[0] || "User";
  
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/holdings", { headers: getAuthHeader() })
      .then((res) => {
        setHoldings(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch holdings for summary:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalInvestment = holdings.reduce((sum, s) => sum + s.avg * s.qty, 0);
  const totalCurrentValue = holdings.reduce((sum, s) => sum + s.price * s.qty, 0);
  const totalPnL = totalCurrentValue - totalInvestment;
  const isProfitable = totalPnL >= 0;

  return (
    <>
      <div className="username">
        <h6>Hi, {firstName}! 👋</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>{" "}
            </p>
            <p>
              Opening balance <span>3.74k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={isProfitable ? "profit" : "loss"}>
              {loading ? "..." : `${isProfitable ? "+" : ""}${totalPnL.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{loading ? "..." : totalCurrentValue.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>{" "}
            </p>
            <p>
              Investment <span>{loading ? "..." : totalInvestment.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
