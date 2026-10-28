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
                <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-text-xs sm:tw-text-sm tw-gap-8 sm:tw-gap-10 lg:tw-gap-0">
                    <div className="lg:tw-col-span-4 tw-min-w-0">
                        <img
                            className="tw-h-10 sm:tw-h-12 lg:tw-h-16 tw-mb-3 sm:tw-mb-4 tw--ml-2 sm:tw--ml-4 tw--mt-2 sm:tw--mt-4"
                            src={SeriousBrokerHandWriting}
                            alt="Serious.Broker"
                        />

                        <div className="tw-mb-5 sm:tw-mb-8 tw-text-xs sm:tw-text-sm">
                            <LeftFloatingContactDetailsItem href={`mailto:${contactEmail}`} title={contactEmail}/>
                            <LeftFloatingContactDetailsItem href={`tel:${phoneNumber}`} title={phoneNumber}/>
                        </div>

                        <span className="tw-text-xs sm:tw-text-sm">© 2026 Serious.Broker</span>
                        <nav className="tw-flex tw-flex-wrap tw-gap-x-4 tw-gap-y-2 sm:tw-gap-5 tw-underline tw-text-xs sm:tw-text-sm tw-mt-2">
                            <Link className="hover:tw-text-secondary" to={routes.gdprInfo}>GDPR</Link>
                            <Link className="hover:tw-text-secondary" to={routes.cookiesInfo}>Cookies</Link>
                            <Link className="hover:tw-text-secondary" to={routes.about}>{t("About us")}</Link>
                            <Link className="hover:tw-text-secondary" to={routes.contact}>{t("Contact")}</Link>
                        </nav>
                    </div>
                    <div className="lg:tw-col-span-8 tw-min-w-0">
                        <p className="tw-text-xs sm:tw-text-sm tw-leading-relaxed tw-break-words">
                            {t("footer.about_project")}
                            <span>
                                <Link to={routes.cooperationInfo} className="tw-underline">{t("footer.cooperation_info")}</Link>
                            </span>
                        </p>
                        <p className="tw-text-xs sm:tw-text-sm tw-leading-relaxed tw-break-words">{t("footer.disclaimer")}</p>

                        <div className="tw-flex tw-flex-col tw-items-start tw-gap-3 sm:tw-gap-5 sm:tw-flex-row sm:tw-items-end">
                            <img src={vsbLogo} style={{filter: "invert(1)"}} alt="VSB"
                                 className="tw-h-[70px] sm:tw-h-[85px] lg:tw-h-[100px] tw--ml-2 sm:tw--ml-5 tw-max-w-full tw-object-contain"/>
                            <img src={seriousInvestmentLogo} alt="Serious Investment" className="tw-h-5 sm:tw-h-6 lg:tw-h-7 tw-mt-1 sm:tw-mt-0 sm:-tw-translate-y-4 lg:sm:-tw-translate-y-[26px] tw-max-w-full tw-object-contain"/>
                        </div>
                    </div>
                </div>

                {/* tw-text-[var(--title-color)] nahrazuje barvu, kterou prvek
                    dostával z pravidla pro nadpisy v _helpers.scss. */}
                <p className="tw-text-center tw-mt-8 tw-mb-2 tw-pb-5 tw-font-semibold tw-font-['Sora'] tw-text-[var(--title-color)] sm:tw-mt-10 lg:tw-mt-8 tw-text-sm sm:tw-text-base lg:tw-text-xl tw-leading-snug">{t("Seriousness • Safety • Trust")}</p>
            </div>
        </footer>
    );
}
