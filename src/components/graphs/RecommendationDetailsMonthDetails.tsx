import {FC} from "react";
import {toPercentTwoDecimal} from "../../utils/functions/functions.ts";
import {BinanceIndexAssetRecomBestPreviousDetails} from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousDetails.ts";
import {useTranslation} from "react-i18next";

type Props = {
    detailsData: BinanceIndexAssetRecomBestPreviousDetails;
}

export const RecommendationDetailsMonthDetails:FC<Props> = ({detailsData}) => {
    const {t} = useTranslation();
    
    return (
        <div className="mb-4">
            {detailsData.month_sug &&
                <p>{t("Month suggestion: ")}{detailsData.month_sug}</p>}
            {detailsData.month_all &&
                <p>{t("Month all: ")}{detailsData.month_all}</p>}
            {detailsData.month_all_profit &&
                <p>{t("Month all profit: ")}{toPercentTwoDecimal(detailsData.month_all_profit)} %</p>}
            {detailsData.month_0_pos &&
                <p>{t("Positions in month 0: ")}{detailsData.month_0_pos}</p>}
            {detailsData.month_0_profit &&
                <p>{t("Month 0 profit: ")}{toPercentTwoDecimal(detailsData.month_0_profit)} %</p>}
            {detailsData.month_1_pos &&
                <p>{t("Positions in month 1: ")}{detailsData.month_1_pos}</p>}
            {detailsData.month_1_profit &&
                <p>{t("Month 1 profit: ")}{toPercentTwoDecimal(detailsData.month_1_profit)} %</p>}
            {detailsData.month_2_pos &&
                <p>{t("Positions in month 2: ")}{detailsData.month_2_pos}</p>}
            {detailsData.month_2_profit &&
                <p>{t("Month 2 profit: ")}{toPercentTwoDecimal(detailsData.month_2_profit)} %</p>}
        </div>
    );
}