import {FC} from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import {useTranslation} from "react-i18next";

export const AboutUs: FC = () => {
  const {t} = useTranslation();
  
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
                  <div className="about__thumb-inner">
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
                  </div>
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
                      Hey there! So glad you stopped by to Meet Our Company. Don't
                      miss out on this opportunity to learn about what we do and
                      the amazing team that makes it all happen!
                    </p>
                    <Link
                        to="/contact"
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