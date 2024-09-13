import {FC} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {pricingData} from "../../../utils/constants/pricingData.ts";
import checkIcon from "../../../utils/icons/icon/check.svg";
import icon1 from "../../../utils/icons/icon/1.png";

export const Pricing:FC = () => {
    const {t} = useTranslation();
    
  return (
      <section className="pricing padding-top padding-bottom">
        <div className="section-header section-header--max50">
          <h2 className="mb-15 mt-minus-5">
              {t("Pricing plan")}
          </h2>
          <p>
              {t("We offer the best pricing plans from basic to premium")}!
          </p>
        </div>
        <div className="container">
          <div className="pricing__wrapper">
            <div className="row g-4 align-items-center">
              {pricingData.map((plan, index) => (
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
                              ${plan.price}/<span>{t("Monthly")}</span>
                            </h3>
                          </div>

                          {/* Pricing Middle */}
                          <div className="pricing__item-middle">
                            <ul className="pricing__list">
                              {plan.features.map((feature, idx) => (
                                  <li className="pricing__list-item" key={idx}>
                                  <span>
                                    <img
                                        src={checkIcon}
                                        alt="check"
                                        className="dark"
                                    />
                                  </span>
                                    {t(feature)}
                                  </li>
                              ))}
                            </ul>
                          </div>
                          <div className="pricing__item-bottom">
                            <Link to="/" className="trk-btn trk-btn--outline">
                                {t("Sign in")}
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
          <img src={icon1} alt="shape-icon" />
        </span>
        </div>
      </section>
  );
};
