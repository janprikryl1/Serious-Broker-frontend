import { FC } from "react";
import { useTranslation } from "react-i18next";
import PotentialForHighReturns from "../../utils/icons/index/potential_for_high_returns.svg";
import ProtectionAgainstInflation from "../../utils/icons/index/protection_against_inflation.svg";
import UsersHaveFullControl from "../../utils/icons/index/users_have_full_controll.svg";


export const WhyToInvestInCryptocurrencies: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="why-to-invest-container">
            <h2 className="index-section-head-title" style={{marginLeft:"16vw"}}>{t("Why to Invest in Cryptocurrencies")}</h2>
            <div className="invest-items-wrapper">
                <div className="invest-item">
                    <img
                        src={PotentialForHighReturns}
                        alt={t("Potential for High Returns")}
                        className="invest-img"
                    />
                    <p className="step-title">{t("Potential for High Returns")}</p>
                    <p className="description">{t("Their popularity is growing rapidly, and some cryptocurrencies have a limited supply")}.</p>
                </div>
                <div className="invest-item">
                    <img
                        src={ProtectionAgainstInflation}
                        alt={t("Protection against inflation")}
                        className="invest-img"
                    />
                    <p className="step-title with-min-height">{t("Protection against inflation")}</p>
                    <p className="description">{t("Limited supply of coins, which is not influenced by decisions made by central banks or governments")}.</p>
                </div>
                <div className="invest-item">
                    <img
                        src={UsersHaveFullControl}
                        alt={t("Users Have Full Control")}
                        className="invest-img"
                    />
                    <p className="step-title">{t("Users Have Full Control")}</p>
                    <p className="description">{t("Decentralization in cryptocurrencies ensures that no central authority can interfere with or restrict your transactions")}.</p>
                </div>
            </div>
        </div>
    );
};
