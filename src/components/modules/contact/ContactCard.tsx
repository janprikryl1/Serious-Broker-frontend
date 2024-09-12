import { Link } from "react-router-dom";
import {FC} from "react";

export const ContactCard:FC = () => {
  return (
      <div className="contact padding-top padding-bottom">
        <div className="container">
          <div className="contact__wrapper">
            <div className="row g-5">
              <div className="col-md-5">
                <div className="contact__info" data-aos="fade-right" data-aos-duration="1000">
                  <div className="contact__social">
                    <h3>let’s <span>{`get in touch `}</span> with us</h3>
                    <ul className="social">
                      <li className="social__item">
                        <Link to="#" className="social__link social__link--style4 active"><i className="fab fa-facebook-f"></i></Link>
                      </li>
                      <li className="social__item">
                        <Link to="#" className="social__link social__link--style4"><i className="fab fa-instagram"></i></Link>
                      </li>
                      <li className="social__item">
                        <Link to="#" className="social__link social__link--style4"><i className="fa-brands fa-linkedin-in"></i></Link>
                      </li>
                      <li className="social__item">
                        <Link to="#" className="social__link social__link--style4"><i className="fab fa-youtube"></i></Link>
                      </li>
                      <li className="social__item">
                        <Link to="#" className="social__link social__link--style4"><i className="fab fa-twitter"></i></Link>
                      </li>
                    </ul>
                  </div>
                  <div className="contact__details">
                    <div className="contact__item" data-aos="fade-right" data-aos-duration="1000">
                      <div className="contact__item-inner">
                        <div className="contact__item-thumb">
                          <span><img src="/images/contact/1.png" alt="contact-icon" className="dark" /></span>
                        </div>
                        <div className="contact__item-content">
                          <p>
                            <a href="tel:+447441448582">+44 744 144 8582</a>
                          </p>
                          <p>
                            <a href="tel:+8801313941166">+880 131 394 1166</a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="contact__item" data-aos="fade-right" data-aos-duration="1100">
                      <div className="contact__item-inner">
                        <div className="contact__item-thumb">
                          <span><img src="/images/contact/2.png" alt="contact-icon" className="dark" /></span>
                        </div>
                        <div className="contact__item-content">
                          <p>
                            <a href="mailto:mail@thetork.com" target="_blank" rel="noopener noreferrer">mail@thetork.com</a>
                          </p>
                          <p>
                            <a href="mailto:support@thetork.com" target="_blank" rel="noopener noreferrer">support@thetork.com</a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="contact__item" data-aos="fade-right" data-aos-duration="1200">
                      <div className="contact__item-inner">
                        <div className="contact__item-thumb">
                          <span><img src="/images/contact/3.png" alt="contact-icon" className="dark" /></span>
                        </div>
                        <div className="contact__item-content">
                          <p>88 Sheridan Street</p>
                          <p>534 Victoria Trail</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="contact__form">
                  <form action="/" data-aos="fade-left" data-aos-duration="1000">
                    <div className="row g-4">
                      <div className="col-12">
                        <div>
                          <label htmlFor="name" className="form-label">Name</label>
                          <input className="form-control" type="text" id="name" placeholder="Full Name" />
                        </div>
                      </div>
                      <div className="col-12">
                        <div>
                          <label htmlFor="email" className="form-label">Email</label>
                          <input className="form-control" type="email" id="email" placeholder="Email here" />
                        </div>
                      </div>
                      <div className="col-12">
                        <div>
                          <label htmlFor="textarea" className="form-label">Message</label>
                          <textarea cols={30} rows={5} className="form-control" id="textarea" placeholder="Enter Your Message"></textarea>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="trk-btn trk-btn--border trk-btn--primary mt-4 d-block">contact us now</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="contact__shape">
          <span className="contact__shape-item contact__shape-item--1"><img src="/images/contact/4.png" alt="shape-icon" /></span>
          <span className="contact__shape-item contact__shape-item--2"> <span></span> </span>
        </div>
      </div>
  );
}