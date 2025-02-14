import {FC} from "react";
import {useTranslation} from "react-i18next";

export const LookingForMoreInDepthStatistics:FC = () => {
    const {t} = useTranslation();
    
    return (
        <section className="cta padding-top padding-bottom bg-color">
            <div className="cta__wrapper">
                <h2 style={{fontSize: "35px"}} className="mb-4 bg-color">{t("Looking for More In-Depth Statistics?")}</h2>
                <ul className="newsletter-list">
                    <li>{t("Detailed insights and historical data on all cryptocurrencies")}</li>
                    <li>{t("Comparison of cryptocurrencies")}</li>
                    <li>{t("Data-driven recommendations on the best moments to trade")}</li>
                    <li>{t("Market trends and real-time updates")}</li>
                    <li>{t("Personalized investment guide")}</li>
                </ul>
            </div>
        </section>
    );
}