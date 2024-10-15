import  {FC} from 'react';
import { Link } from 'react-router-dom';
import ScrollToTop from "react-scroll-to-top";
import {useTranslation} from "react-i18next";
import {SocialLinkIcon} from "./modules/contact/SocialLinkIcon.tsx";
import footer1 from "../utils/icons/footer/1.png";
import {facebookURL, instagramURL, routes} from "../utils/constants";


export const Footer:FC = () => {
  const {t} = useTranslation();
  return (
      <>
        <footer className="footer brand-1">
          <div className="container">
            <div className="footer__wrapper">
              <div className="footer__top footer__top--style1">
                <div className="row gy-2 gx-4">
                  <div className="col-md-6">
                    <div className="footer__about">
                      <p className="footer__about-moto">
                        {t("Serious Broker is a student project that is being developed as part of a bachelor thesis. It focuses on assisting in investing and spreading awareness about cryptocurrencies. Want to know more? Join us on social media or contact us via email for example.")}
                      </p>
                    </div>
                  </div>

                  <div className="col-md-1 col-sm-4 col-6">
                    <div className="footer__links">
                      <div className="footer__links-content">
                        <ul className="footer__linklist">
                          <li className="footer__linklist-item"><Link to={routes.about} className="link-underline-none">{t("About us")}</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-2 col-sm-4 col-6">
                    <div className="footer__links">
                      <div className="footer__links-content">
                        <ul className="footer__linklist">
                          <li className="footer__linklist-item"><Link to={routes.contact} className="link-underline-none">{t("Contact")}</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="footer__bottom">
                <div className="footer__end">
                  <div className="footer__end-copyright">
                    <p className="mb-0">© 2024 VŠB</p>
                  </div>
                  <div>
                    <ul className="social">
                      <SocialLinkIcon href={facebookURL} icon="fab fa-facebook-f" />
                      <SocialLinkIcon href={instagramURL} icon="fab fa-instagram" />
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer__shape">
          <span className="footer__shape-item footer__shape-item--1">
            <img src={footer1} alt="shape icon" />
          </span>
            <span className="footer__shape-item footer__shape-item--2"><span></span></span>
          </div>
        </footer>

        <ScrollToTop
            smooth
            height="16px"
            width="14px"
            className="scrollToTop scrollToTop--home1"
            viewBox="0 0 448 512"
            svgPath="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z"
        />
      </>
  );
}
