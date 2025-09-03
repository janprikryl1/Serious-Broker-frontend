import  {FC} from 'react';
import {useTranslation} from "react-i18next";
import {SocialLinkIcon} from "../contact/SocialLinkIcon.tsx";
import {LeftFloatingContactDetailsItem} from "../contact/LeftFloatingContactDetailsItem.tsx";
import {
    contactEmail,
    facebookURL,
    instagramURL,
    linkedinURL,
    phoneNumber, routes,
    twitterURL,
    youtubeURL
} from "../../utils/constants";
import {Link} from "react-router-dom";
import seriousInvestmentLogo from "../../utils/icons/footer/SI_white_sticker.svg";
import vsbLogo from "../../utils/icons/footer/fei_it.png";
import {useMediaQuery} from "@mui/material";

export const Footer:FC = () => {
  const {t} = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return (
    <footer className="container">
        <div className="footer-mob">
            <div className="footer__top--style1">
                <div className="row">
                    <Link to={routes.cooperationInfo}><p className="footer__about-moto">{t("Serious Broker was implemented in cooperation with the Department of Computer Science.")}</p></Link>
                    <p>{t("Want to know more? Join us on social media or contact us via email for example.")}</p>
                    <div className="col-md-6 font-footer mt-5">
                        <p className="footer__about-moto">{t("We are not a financial consultancy")}.</p>
                        <a href="https://www.vsb.cz/cs/"><img src={vsbLogo} style={{filter: "invert(1)"}} width={300} alt="VSB"/></a>
                        <a href="https://www.serious-investment.cz/"><img src={seriousInvestmentLogo} width={180} alt="Serious Investment"/></a>
                    </div>
                    {!isMobile && (
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
                    )}
                </div>
            </div>
            <div className="footer__end">
                <div className="footer__end-content">
                    <span>© 2024–2025 Serious.broker</span>
                    <nav className="footer__links">
                        <Link to={routes.gdprInfo}>GDPR</Link>
                        <Link to={routes.cookiesInfo}>Cookies</Link>
                        <Link to={routes.about}>{t("About us")}</Link>
                        <Link to={routes.contact}>{t("Contact")}</Link>
                    </nav>
                </div>
            </div>
        </div>
    </footer>
  );
}
