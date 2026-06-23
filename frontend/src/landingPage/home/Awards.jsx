import React from "react";
function Awards() {
  return (
    <div className="container mt-4 p-5">
      <div className="row">
        <div className="col col-6">
          <h1>Unbeatable pricing</h1>
          <p>
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>
          <a href="/Pricing" style={{ textDecoration: "none" }}>
            See Pricing
          </a>
        </div>
        <div className="col col-6">
          {/* <img src="/pics/awards.png" style={{ width: "95%" }}></img> */}
        </div>
      </div>
    </div>
  );
}

export default Awards;
