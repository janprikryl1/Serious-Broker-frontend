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
import seriousInvestmentLogo from "../../utils/icons/footer/serious_investment.jpeg";
import vsbLogo from "../../utils/icons/footer/vsb.png";
import feiLogo from "../../utils/icons/footer/fei.png";

export const Footer:FC = () => {
  const {t} = useTranslation();
  
  return (
    <footer className="container">
        <div className="footer-mob">
            <div className="footer__top--style1">
                <div className="row">
                    <div className="col-md-6 font-footer">
                        <Link to={routes.cooperationInfo}><p className="footer__about-moto">{t("The project is implemented in cooperation with the Department of Computer Science.")}</p></Link>
                        <p>{t("Want to know more? Join us on social media or contact us via email for example.")}</p>
                        <p className="footer__about-moto">{t("We are not a financial consultancy")}.</p>
                    </div>
                    <div className="col-md-2">
                        <a href="https://www.vsb.cz/cs/"><img src={vsbLogo} width={80} alt="VSB"/></a>
                        <a href="https://www.fei.vsb.cz/cs/index.html"><img src={feiLogo} width={80} alt="FEI"/></a>
                        <a href="https://www.serious-investment.cz/"><img src={seriousInvestmentLogo} width={80} alt="Serious Investment"/></a>
                    </div>
                    <div className="col-sm-4 d-flex justify-content-end">
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
                <div className="footer__end-content">
                    <span>© 2024–2025 Serious.broker</span>
                    <nav className="footer__links">
                        <Link to={routes.gdprInfo}>GDPR</Link>
                        <Link to={routes.cookiesInfo}>Cookies</Link>
                        <Link to={routes.contact}>Kontakt</Link>
                    </nav>
                </div>
            </div>
        </div>
    </footer>
  );
}
