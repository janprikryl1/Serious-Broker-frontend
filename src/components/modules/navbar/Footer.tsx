import  {FC} from 'react';
import ScrollToTop from "react-scroll-to-top";
import {useTranslation} from "react-i18next";
import {
  contactEmail,
  facebookURL,
  instagramURL,
  linkedinURL,
  phoneNumber,
  twitterURL,
  youtubeURL
} from "../../../utils/constants";
import {SocialLinkIcon} from "../contact/SocialLinkIcon.tsx";
import {LeftFloatingContactDetailsItem} from "../contact/LeftFloatingContactDetailsItem.tsx";

export const Footer:FC = () => {
  const {t} = useTranslation();
  return (
      <>
        <footer className="footer">
          <div className="container">
            <div className="footer__wrapper">
              <div className="footer__top footer__top--style1">
                <div className="row">
                  <div className="col-md-6">
                    <div className="footer__about">
                      <p className="footer__about-moto">
                        {t("Serious Broker is a student project that is being developed as part of a bachelor thesis. It focuses on assisting in investing and spreading awareness about cryptocurrencies.")}
                      </p>
                      <p className="footer__about-moto">{t("Want to know more? Join us on social media or contact us via email for example.")}</p>
                      <p className="footer__about-moto">{t("We are not a financial consultancy")}.</p>
                    </div>
                  </div>
                  <div className="col-sm-6 d-flex justify-content-end">
                    <div className="contact text-end" data-aos="fade-right" data-aos-duration="1000">
                      <LeftFloatingContactDetailsItem href={`mailto:${contactEmail}`} title={contactEmail}/>
                      <LeftFloatingContactDetailsItem href={`tel:${phoneNumber}`} title={phoneNumber}/>
                      <ul className="social justify-content-end">
                        <SocialLinkIcon href={facebookURL} icon="fab fa-facebook-f"/>
                        <SocialLinkIcon href={instagramURL} icon="fab fa-instagram"/>
                        <SocialLinkIcon href={linkedinURL} icon="fa-brands fa-linkedin-in"/>
                        <SocialLinkIcon href={twitterURL} icon="fab fa-x-twitter"/>
                        <SocialLinkIcon href={youtubeURL} icon="fab fa-youtube"/>
                      </ul>
                    </div>
                  </div>

                </div>
              </div>
              <div className="footer__end">
                <div>
                  <p>© 2024 - 2025</p>
                  <p>VŠB - Technical University of Ostrava</p>
                </div>
              </div>
            </div>
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
