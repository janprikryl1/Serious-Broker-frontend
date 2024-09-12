import {FC} from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

export const AboutUs: FC = () => {
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
                      <img
                          className="dark"
                          src="/images/about/1.png"
                          alt="about-image"
                      />
                      <div className="floating-content__top-left">
                        <div className="floating-content__item">
                          <h3>
                          <span className="purecounter">
                            <CountUp end={10} duration={10} />
                          </span>
                            Years
                          </h3>
                          <p>Consulting Experience</p>
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
                          <p>Satisfied Customers</p>
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
                      Meet <span>our company</span> unless miss the opportunity
                    </h2>

                    <p className="mb-0">
                      Hey there! So glad you stopped by to Meet Our Company. Don't
                      miss out on this opportunity to learn about what we do and
                      the amazing team that makes it all happen! Our company is
                      all about creating innovative solutions and providing
                      top-notch services to our clients. From start to finish,
                      we're dedicated to delivering results that exceed
                      expectations.
                    </p>
                    <Link
                        to="/about"
                        className="trk-btn trk-btn--border trk-btn--primary"
                    >
                      Explore More
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