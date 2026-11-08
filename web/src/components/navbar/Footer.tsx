import {FC} from 'react';
import {useTranslation} from "react-i18next";
import {LeftFloatingContactDetailsItem} from "../contact/LeftFloatingContactDetailsItem.tsx";
import {
    contactEmail,
    phoneNumber, routes,
} from "../../utils/constants";
import {Link} from "react-router-dom";
import seriousInvestmentLogo from "../../utils/icons/footer/SI_white_logo.svg";
import vsbLogo from "../../utils/icons/footer/ki_long_bw_cz.png";
import SeriousBrokerHandWriting from "../../utils/icons/logo/SB-logo-handwritten-white.svg";

export const Footer: FC = () => {
    const {t} = useTranslation();

    return (
        <footer className="tw-mt-16 sm:tw-mt-20 lg:tw-mt-[100px]">
            <hr className="tw-border-t tw-border-gray-1 tw-my-6 tw-mt-8 sm:tw-mt-10 tw-mb-8 sm:tw-mb-10"/>

            <div className="container tw-px-3 sm:tw-px-4 lg:tw-px-0">
                {/* Logo */}
                <img
                  className="tw-h-10 sm:tw-h-12 lg:tw-h-16 tw-mb-3 sm:tw-mb-4 tw--ml-2 sm:tw--ml-4 tw--mt-2 sm:tw--mt-4"
                  src={SeriousBrokerHandWriting}
                  alt="Serious.Broker"
                />

                <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-text-xs sm:tw-text-sm tw-gap-1 lg:tw-gap-0">
                    {/* Contact */}
                    <div className="lg:tw-col-span-4 tw-min-w-0">
                        <div className="tw-mb-5 tw-text-xs sm:tw-text-sm">
                            <LeftFloatingContactDetailsItem href={`mailto:${contactEmail}`} title={contactEmail}/>
                            <LeftFloatingContactDetailsItem href={`tel:${phoneNumber}`} title={phoneNumber}/>
                        </div>
                    </div>

                    <div className="lg:tw-col-span-8 tw-min-w-0">
                        {/* Logos */}
                        <div className="tw-flex tw-flex-col tw-items-start tw-gap-3 tw--mt-5 sm:tw-gap-5 sm:tw-flex-row sm:tw-items-end">
                            <img src={vsbLogo} style={{filter: "invert(1)"}} alt="VSB"
                                className="tw-h-[75px]  lg:tw-h-[80px] tw--ml-5 tw-max-w-full tw-object-contain"/>
                            <img src={seriousInvestmentLogo} alt="Serious Investment"
                                className="tw-h-6 lg:tw-h-7 tw-mt-1 sm:tw-mt-0 sm:-tw-translate-y-4 lg:sm:-tw-translate-y-[26px] tw-max-w-full tw-object-contain"/>
                        </div>

                        {/* Disclaimer */}
                        <div className="tw-text-xs sm:tw-text-sm tw-mt-7 sm:tw-mt-3 tw-mb-3 lg:tw-mb-0 tw-leading-relaxed tw-break-words">{t("footer.disclaimer")}</div>
                    </div>
                </div>

                <div className="tw-mt-2 tw-grid tw-grid-cols-1 sm:tw-grid-cols-12 sm:tw-items-center">
                    {/* Copyright */}
                    <span className="tw-text-xs sm:tw-col-span-4 sm:tw-text-sm">
                        © 2026 Serious.Broker
                    </span>

                    {/* Links */}
                    <nav className="tw-flex tw-flex-wrap tw-gap-x-4 tw-gap-y-2 tw-underline sm:tw-col-span-8 sm:tw-gap-5 tw-text-xs sm:tw-text-sm">
                        <Link className="hover:tw-text-secondary" to={routes.gdprInfo}>GDPR</Link>
                        <Link className="hover:tw-text-secondary" to={routes.cookiesInfo}>Cookies</Link>
                        <Link className="hover:tw-text-secondary" to={routes.about}>{t("About us")}</Link>
                        <Link className="hover:tw-text-secondary" to={routes.contact}>{t("Contact")}</Link>
                    </nav>
                </div>

                {/* Slogan */}
                <div className="tw-text-center tw-mt-9 tw-mb-2 tw-pb-5 tw-font-semibold tw-text-[var(--title-color)] tw-text-sm sm:tw-text-base lg:tw-text-xl tw-leading-snug">
                    {t("Seriousness • Safety • Trust")}
                </div>
            </div>
        </footer>
    );
}
