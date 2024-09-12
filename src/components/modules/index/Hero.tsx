import {FC, useState} from "react";
import { Link } from "react-router-dom";
import FsLightbox from "fslightbox-react";

export const Hero:FC = () => {
  const [toggler, setToggler] = useState(false);

  return (
      <>
        <FsLightbox toggler={toggler} sources={["https://youtu.be/MHhIzIgFgJo"]} />
        <section className="banner banner--style1">
          <div className="banner__bg">
            <div className="banner__bg-element">
              <img
                  src="images/banner/home1/bg.png"
                  alt="section-bg-element"
                  className="dark d-none d-lg-block"
                  style={{ width: '100%', height: 'auto' }}
              />
              <span className="bg-color d-lg-none"></span>
            </div>
          </div>
          <div className="container">
            <div className="banner__wrapper">
              <div className="row gy-5 gx-4">
                <div className="col-lg-6 col-md-7">
                  <div
                      className="banner__content"
                      data-aos="fade-right"
                      data-aos-duration="1000"
                  >
                    <div className="banner__content-coin">
                      <img src="images/banner/home1/3.png" alt="coin icon" />
                    </div>
                    <h1 className="banner__content-heading">
                      Invest your money with <span>higher return</span>
                    </h1>
                    <p className="banner__content-moto">
                      Anyone can invest money in different currencies to increase
                      their earnings with the help of Bitrader through online.
                    </p>
                    <div className="banner__btn-group btn-group">
                      <Link to="/signin" className="trk-btn trk-btn--primary trk-btn--arrow">
                        Get Started
                        <span>
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                      </Link>

                      <button
                          onClick={() => setToggler(!toggler)}
                          className="trk-btn trk-btn--outline22"
                      >
                      <span className="style1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                          <g clipPath="url(#clip0_1397_814)">
                            <path
                                d="M10.5547 7.03647C9.89015 6.59343 9 7.06982 9 7.86852V16.1315C9 16.9302 9.89015 17.4066 10.5547 16.9635L16.7519 12.8321C17.3457 12.4362 17.3457 11.5638 16.7519 11.1679L10.5547 7.03647Z"
                                stroke="#0A4FD5"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                          </g>
                          <rect
                              x="-0.75"
                              y="0.75"
                              width="22.5"
                              height="22.5"
                              rx="11.25"
                              transform="matrix(-1 0 0 1 22.5 0)"
                              stroke="#0A4FD5"
                              strokeWidth="1.5"
                          />
                          <defs>
                            <clipPath id="clip0_1397_814">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>{" "}
                        Watch Video
                      </button>
                    </div>

                    <div className="banner__content-social">
                      <p>Follow Us</p>
                      <ul className="social">
                        <li className="social__item">
                          <Link to="/" className="social__link social__link--style1 active">
                            <i className="fab fa-facebook-f"></i>
                          </Link>
                        </li>
                        <li className="social__item">
                          <Link to="/" className="social__link social__link--style1">
                            <i className="fab fa-linkedin-in"></i>
                          </Link>
                        </li>
                        <li className="social__item">
                          <Link to="/" className="social__link social__link--style1">
                            <i className="fab fa-instagram"></i>
                          </Link>
                        </li>
                        <li className="social__item">
                          <Link to="/" className="social__link social__link--style1">
                            <i className="fab fa-youtube"></i>
                          </Link>
                        </li>
                        <li className="social__item">
                          <Link to="/signin" className="social__link social__link--style1">
                            <i className="fab fa-twitter"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-5">
                  <div
                      className="banner__thumb"
                      data-aos="fade-left"
                      data-aos-duration="1000"
                  >
                    <img src="images/banner/home1/1.png" alt="banner-thumb" className="dark" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="banner__shape">
          <span className="banner__shape-item banner__shape-item--1">
            <img src="images/banner/home1/4.png" alt="shape icon" />
          </span>
          </div>
        </section>
      </>
  );
};