import {FC} from "react";
import {useTranslation} from "react-i18next";

export const AssetCalculatorComponentTextColumn:FC = () => {
    const { t } = useTranslation();

    return (
        <div className="calculator-info-panel info-panel mt-4">
            <div className="step">
                <div className="index-step-number" style={{backgroundColor: "#ad9747", color: "black", boxShadow:"0px 2px 4px 1px rgba(173, 151, 71, 0.3)"}}>1</div>
                <p className="step-text">{t("Enter or choose a cryptocurrency, e.g. Bitcoin.")}</p>
            </div>
            <div className="step">
                <div className="index-step-number" style={{backgroundColor: "#ad9747", color: "black", boxShadow:"0px 2px 4px 1px rgba(173, 151, 71, 0.3)"}}>2</div>
                <p className="step-text">{t("Enter the amount you would buy the cryptocurrency for.")}</p>
            </div>
            <div className="step">
                <div className="index-step-number" style={{backgroundColor: "#ad9747", color: "black", boxShadow:"0px 2px 4px 1px rgba(173, 151, 71, 0.3)"}}>3</div>
                <p className="step-text">{t("Choose the currency in which the result should be displayed.")}</p>
            </div>
            <div className="step">
                <div className="index-step-number" style={{backgroundColor: "#ad9747", color: "black", boxShadow:"0px 2px 4px 1px rgba(173, 151, 71, 0.3)"}}>4</div>
                <p className="step-text">{t("Select the period for which you would hold the investment.")}</p>
            </div>
            <div className="step">
                <div className="index-step-number" style={{backgroundColor: "#ad9747", color: "black", boxShadow:"0px 2px 4px 1px rgba(173, 151, 71, 0.3)"}}>5</div>
                <p className="step-text">{t("Click the 'Calculate' button.")}</p>
            </div>

            <p className="step-disclaimer">{t("The result represents the profitability of the selected cryptocurrency for the given period backward from today.")}</p>
            <p className="step-disclaimer-small">{t("Past returns are no guarantee of future results.")}</p>
        </div>
    )
}