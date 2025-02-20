import {FC} from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import {useTranslation} from "react-i18next";
import {useMediaQuery} from "@mui/material";
import {routes} from "../../utils/constants";

export const AboutUs: FC = () => {
  const {t} = useTranslation();
  const isMobile = useMediaQuery('(max-width:990px)');
  
  return (
      <section className="about about--style1">
        <div className="container">
          <div className="about__wrapper">
            <div className="row gx-5 gy-4 gy-sm-0 align-items-center">
              <div className="col-lg-6">
                <div
                    className="about__thumb pe-lg-5"
                    data-aos="fade-right"
                    data-aos-duration="800"
                >
                  {!isMobile && (<div className="about__thumb-inner">
                    <div className="about__thumb-image floating-content">
                      <div className="floating-content__top-left">
                        <div className="floating-content__item">
                          <h3>
                          <span className="purecounter">
                            <CountUp end={10} duration={10} />
                          </span>
                            {"+ "}{t("Years")}
                          </h3>
                          <p>{t("Experience")}</p>
                        </div>
                      </div>
                      <div className="floating-content__bottom-right">
                        <div className="floating-content__item">
                          <h3>
                          <span className="purecounter">
                            <CountUp end={30} duration={5} />
                          </span>
                            K+
                          </h3>
                          <p>{t("Coins")}</p>
                        </div>
                      </div>
                    </div>
                  </div>)}
                </div>
              </div>
              <div className="col-lg-6">
                <div
                    className="about__content"
                    data-aos="fade-left"
                    data-aos-duration="800"
                >
                  <div className="about__content-inner">
                    <h2>
                      {t("Meet")} <span>Serious broker</span> {t("now")}!
                    </h2>

                    <p className="mb-0">
                      {t("Serious Broker is a student project that is being developed as part of a bachelor thesis. It focuses on assisting in investing and spreading awareness about cryptocurrencies. Want to know more? Join us on social media or contact us via email for example.")}
                    </p>
                    <Link
                        to={routes.contact}
                        className="trk-btn trk-btn--border trk-btn--primary"
                    >
                      {t("Contact")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};