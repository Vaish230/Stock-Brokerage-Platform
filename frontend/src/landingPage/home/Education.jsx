import React from "react";
function Education() {
  return (
    <div className="container mt-3 p-5">
      <div className="row">
        <div className="col col-6">
          <img src="/pics/education.svg"></img>
        </div>
        <div className="col col-6 mt-4 ">
          <h2 className="mb-5">Free and open market education</h2>
          <p className="mb-2">
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>
          <a href="/varsity" style={{ textDecoration: "none" }}>
            Varsity<i class="fa-solid fa-arrow-right"></i>
          </a>
          <p className=" mt-4 mb-2">
            TradingQ&A, the most active trading and investment community in
            India for all your market related queries.
          </p>
          <a href="/tradingqna" style={{ textDecoration: "none" }}>
            TradingQ&A <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Education;
