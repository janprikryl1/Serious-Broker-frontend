import  {FC} from 'react';
import {useTranslation} from "react-i18next";
import {SocialLinkIcon} from "../contact/SocialLinkIcon.tsx";
import {LeftFloatingContactDetailsItem} from "../contact/LeftFloatingContactDetailsItem.tsx";
import {
    contactEmail,
    facebookURL,
    instagramURL,
    linkedinURL,
    phoneNumber,
    twitterURL,
    youtubeURL
} from "../../utils/constants";

export const Footer:FC = () => {
  const {t} = useTranslation();
  
  return (
    <footer className="container">
        <div className="footer-mob">
        <div className="footer__top--style1">
          <div className="row">
            <div className="col-md-6 font-footer">
                <p>
                  {t("Serious Broker is a student project that is being developed as part of a bachelor thesis. It focuses on assisting in investing and spreading awareness about cryptocurrencies.")}
                </p>
                <p className="footer__about-moto">{t("Want to know more? Join us on social media or contact us via email for example.")}</p>
                <p className="footer__about-moto">{t("We are not a financial consultancy")}.</p>
            </div>
            <div className="col-sm-6 d-flex justify-content-end">
              <div className="contact text-end">
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
    </footer>
  );
}
