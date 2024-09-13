import { FC } from "react";
import {useTranslation} from "react-i18next";
import cta2 from "../../../utils/icons/cta/2.png";
import cta4 from "../../../utils/icons/cta/4.png";
import cta5 from "../../../utils/icons/cta/5.png";

export const Newsletter: FC = () => {
  const {t} = useTranslation();
  
  return (
      <section className="cta padding-top padding-bottom bg-color">
        <div className="container">
          <div className="cta__wrapper">
            <div className="cta__newsletter d-flex justify-content-center">
              <div
                  className="cta__newsletter-inner text-center"
                  data-aos="fade-up"
                  data-aos-duration="1000"
              >
                <div className="cta__subscribe">
                  <h2>
                    <span>{t("Subscribe")}</span> {t("to our news")}
                  </h2>
                  <p>{t("Subscribe to our news now and stay in the loop!")}</p>
                  <form className="cta-form form-subscribe" action="">
                    <div className="cta-form__inner d-sm-flex align-items-center justify-content-center">
                      <input
                          type="email"
                          className="form-control form-control--style2 mb-3 mb-sm-0"
                          placeholder="Email"
                      />
                      <button
                          className="trk-btn trk-btn--large trk-btn--secondary2"
                          type="submit"
                          disabled
                      >
                        {t("Submit")}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="cta__shape">
            <span className="cta__shape-item cta__shape-item--1">
              <img src={cta2} alt="shape icon" />
            </span>
              <span className="cta__shape-item cta__shape-item--2">
              <img src={cta4} alt="shape icon" />
            </span>
              <span className="cta__shape-item cta__shape-item--3">
              <img src={cta5} alt="shape icon" />
            </span>
            </div>
          </div>
        </div>
      </section>
  );
};
