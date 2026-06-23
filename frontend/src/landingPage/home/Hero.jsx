import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container  mx-my-5 px-5 ">
      <div className="row text-center">
        <img src="/pics/homeHero.png" alt="Hero" className="p-4 " />
        <h1 className="mb-3">Invest in Everything</h1>
        <p>Online platform to invest in stocks, directives, and more</p>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/signup">
            <button
              className="btn btn-primary mb-2"
              style={{
                width: "150px",
                height: "40px",
              }}
            >
              SignUp Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
