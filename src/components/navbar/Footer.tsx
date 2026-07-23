import {FC} from 'react';
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
import SeriousBrokerHandWriting from "../../utils/icons/logo/SB-handwritten-white.svg";

export const Footer: FC = () => {
    const {t} = useTranslation();

    return (
        <footer className={"tw-bg-[#2C2523] tw-bg-opacity-0"}>
            <hr className="tw-border-t tw-border-gray-1 my-6 tw-mt-10 tw-mb-10"/>

            <div className="container">
                <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-text-sm tw-gap-14 lg:tw-gap-0">
                    <div className="lg:tw-col-span-4">
                        <img
                            className="tw-h-16 tw-mb-4 tw--ml-4 tw--mt-4"
                            src={SeriousBrokerHandWriting}
                            alt="Serious.Broker"
                        />

                        <div className="tw-mb-8">
                            <LeftFloatingContactDetailsItem href={`mailto:${contactEmail}`} title={contactEmail}/>
                            <LeftFloatingContactDetailsItem href={`tel:${phoneNumber}`} title={phoneNumber}/>
                        </div>

                        <span>© 2026 Serious.Broker</span>
                        <nav className="tw-flex tw-gap-5 tw-underline">
                            <Link className="hover:tw-text-secondary" to={routes.gdprInfo}>GDPR</Link>
                            <Link className="hover:tw-text-secondary" to={routes.cookiesInfo}>Cookies</Link>
                            <Link className="hover:tw-text-secondary" to={routes.about}>{t("About us")}</Link>
                            <Link className="hover:tw-text-secondary" to={routes.contact}>{t("Contact")}</Link>
                        </nav>
                    </div>
                    <div className="lg:tw-col-span-8">
                        <p>
                            {t("footer.about_project")}
                            <span>
                                <Link to={routes.cooperationInfo} className="tw-underline">{t("footer.cooperation_info")}</Link>
                            </span>
                        </p>
                        <p>{t("footer.disclaimer")}</p>

                        <div className="tw-flex tw-flex-col tw-items-baseline tw-gap-5 sm:tw-flex sm:tw-flex-row">
                            <a href="https://www.vsb.cz/cs/">
                                <img src={vsbLogo} style={{filter: "invert(1)"}} alt="VSB"
                                     className="tw-h-[100px] tw--ml-5"/>
                            </a>
                            <a href="https://www.serious-investment.cz/">
                                <img src={seriousInvestmentLogo} alt="Serious Investment" className="tw-h-7 tw-mt-5"/>
                            </a>
                        </div>
                    </div>
                </div>

                <h4 className="tw-text-center tw-mt-10 lg:tw-mt-8 ">{t("Seriousness • Safety • Trust")}</h4>
            </div>
        </footer>
    );
}
