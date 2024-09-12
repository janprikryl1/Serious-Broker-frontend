import {FC} from "react";
import {Link} from "react-router-dom";

export const Pricing:FC = () => {
  return (
      <section className="pricing padding-top padding-bottom">
        <div className="section-header section-header--max50">
          <h2 className="mb-15 mt-minus-5">
            Our <span>pricings</span> plan
          </h2>
          <p>
            We offer the best pricing plans around - from installations to repairs, maintenance, and more!
          </p>
        </div>
        <div className="container">
          <div className="pricing__wrapper">
            <div className="row g-4 align-items-center">
              {[
                {
                  name: "Basic",
                  price: 99,
                  features: [
                    "Weekly online meeting",
                    "Unlimited learning access",
                    "24/7 technical support",
                    "Personal training",
                  ],
                  animation: "fade-right",
                },
                {
                  name: "Standard",
                  price: 149,
                  features: [
                    "Weekly online meeting",
                    "Unlimited learning access",
                    "24/7 technical support",
                    "Personal training",
                    "Business analysis",
                  ],
                  animation: "fade-up",
                  active: true,
                },
                {
                  name: "Premium",
                  price: 199,
                  features: [
                    "With all standard features",
                    "Unlimited learning access",
                    "24/7 technical support",
                    "Personal training",
                  ],
                  animation: "fade-left",
                },
              ].map((plan, index) => (
                  <div className="col-md-6 col-lg-4" key={index}>
                    <div
                        className={`pricing__item ${plan.active ? "active" : ""}`}
                        data-aos={plan.animation}
                        data-aos-duration="1000"
                    >
                      <div className="pricing__item-inner">
                        <div className="pricing__item-content">
                          {/* Pricing Top */}
                          <div className="pricing__item-top">
                            <h6 className="mb-15">{plan.name}</h6>
                            <h3 className="mb-25">
                              ${plan.price}/<span>Monthly</span>
                            </h3>
                          </div>

                          {/* Pricing Middle */}
                          <div className="pricing__item-middle">
                            <ul className="pricing__list">
                              {plan.features.map((feature, idx) => (
                                  <li className="pricing__list-item" key={idx}>
                              <span>
                                <img
                                    src="/images/icon/check.svg"
                                    alt="check"
                                    className="dark"
                                />
                              </span>
                                    {feature}
                                  </li>
                              ))}
                            </ul>
                          </div>

                          {/* Pricing Bottom */}
                          <div className="pricing__item-bottom">
                            <Link to="signup" className="trk-btn trk-btn--outline">
                              Choose Plan
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pricing__shape">
        <span className="pricing__shape-item pricing__shape-item--1">
          <span></span>
        </span>
          <span className="pricing__shape-item pricing__shape-item--2">
          <img src="/images/icon/1.png" alt="shape-icon" />
        </span>
        </div>
      </section>
  );
};
