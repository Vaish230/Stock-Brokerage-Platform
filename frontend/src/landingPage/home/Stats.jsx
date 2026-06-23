import React from "react";
function Stats() {
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col col-6">
          <h3 className="mb-5">Trust with confidence</h3>

          <h5>Customer-first always</h5>
          <p className=" mt-2 mb-4">
            That's why 1.6+ crore customers trust Zerodha with ~ ₹6 lakh crores
            of equity investments, making us India's largest broker;
            contributing to 15% of daily retail exchange volumes in India.
          </p>

          <h5>No spam or gimmicks</h5>

          <p className=" mt-2 mb-4">
            No gimmicks, spam, "gamification", or annoying push notifications.
            High quality apps that you use at your pace, the way you like.
          </p>

          <h5>The Zerodha universe</h5>
          <p className=" mt-2 mb-4">
            Not just an app, but a whole ecosystem. Our investments in 30+
            fintech startups offer you tailored services specific to your needs.
          </p>
          <h5>Do better with money</h5>
          <p className=" mt-2 mb-4">
            With initiatives like Nudge and Kill Switch, we don't just
            facilitate transactions, but actively help you do better with your
            money.
          </p>
        </div>
        <div className="col col-6 text-center ">
          <img src="/pics/ecosystem.png" style={{ width: "95%" }}></img>
          <div className="row">
            <div className="col col-4 text-center fs-6">
              <a href="/products" style={{ textDecoration: "none" }}>
                Explore our products <i class="fa-solid fa-arrow-right"></i>
              </a>
            </div>
            <div className="col col-4 text-center fs-6">
              <a href="/request" style={{ textDecoration: "none" }}>
                Request a demo <i class="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
