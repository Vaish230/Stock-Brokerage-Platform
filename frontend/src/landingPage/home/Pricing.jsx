import React from "react";
function Pricing() {
  return (
    <div className="container mt-4 p-5">
      <div className="row">
        <div className="col col-6">
          <img src="/pics/largestBroker.svg"></img>
        </div>
        <div className="col col-6">
          <h2 className="mb-3">Largest stock broker in India</h2>
          <p className="mb-5">
            2+million Zerodha clients contribute to over 15% of all retail order
            volumes in India daily by trading and investing in:
          </p>
          <div className="row mb-4" style={{ display: "flex-wrap" }}>
            <div className="col-6">
              <ul>
                <li>Futures and Options</li>
                <li>Commodity derivatives</li>
                <li>Currency derivatives</li>
              </ul>
            </div>
            <div className="col-6">
              <ul>
                <li>Stocks and IPO's</li>
                <li>Direct mutual funds</li>
                <li>Bonds and government</li>
              </ul>
            </div>
          </div>
          <img src="/pics/pressLogos.png" style={{ width: "80%" }}></img>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
