import {FC} from "react";
import {useTranslation} from "react-i18next";

export const BitcoinProfitCalculator:FC = () => {
    const {t} = useTranslation();
    
    return (
        <div style={{backgroundColor: "#3c3936"}}>
            <div className="container pt-5 pb-5">
                <h2 className="index-section-head-title">{t("Bitcoin Profit Calculator")}</h2>
                <p className="index-section-head-title">{t("Curious how much you'd have earned if you invested in bitcoin earlier? Explore the potential of past investments and discover what your gains could have been")}.</p>
            </div>
        </div>
    )
}