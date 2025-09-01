import { FC } from "react";
import { useTranslation } from "react-i18next";
import { AssetCalculatorSingleCoin } from "./AssetCalculatorSingleCoin.tsx";

export const AssetCalculatorComponent: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="asset-calculator">
            <div className="container">
            <h2>{t("Crypto calculator")}</h2>
            <p className="subtitle">{t("Calculate How Much You Could Have Earned If You Started Investing In Crypto Earlier With Serious.Broker")}</p>

            <div className="calculator-main-layout">
                <AssetCalculatorSingleCoin />

                {/* The information panel on the right */}
                <div className="calculator-info-panel info-panel">
                    <div className="step">
                        <div className="step-number">1</div>
                        <p className="step-text">{t("Enter or choose a cryptocurrency, e.g. Bitcoin.")}</p>
                    </div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <p className="step-text">{t("Enter the amount you would buy the cryptocurrency for.")}</p>
                    </div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <p className="step-text">{t("Choose the currency in which the result should be displayed.")}</p>
                    </div>
                    <div className="step">
                        <div className="step-number">4</div>
                        <p className="step-text">{t("Select the period for which you would hold the investment.")}</p>
                    </div>
                    <div className="step">
                        <div className="step-number">5</div>
                        <p className="step-text">{t("Click the 'Calculate' button.")}</p>
                    </div>

                    <p className="step-disclaimer">{t("The result represents the profitability of the selected cryptocurrency for the given period backward from today.")}</p>
                    <p className="step-disclaimer-small">{t("Past returns are no guarantee of future results.")}</p>
                </div>
            </div>
            </div>
        </div>
    );
}