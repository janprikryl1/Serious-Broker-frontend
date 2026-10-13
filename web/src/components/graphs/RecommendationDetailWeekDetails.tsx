import {FC} from "react";
import {toPercentTwoDecimal} from "../../utils/functions/functions.ts";
import { useTranslation } from "react-i18next";
import {BinanceIndexAssetRecomBestPreviousDetails} from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousDetails.ts";

/*
* Info and stats to weekly analytics
* URL: https://serious.broker/graphs/recommendation/detail/BTC
* */

type Props = {
    detailsData: BinanceIndexAssetRecomBestPreviousDetails;
}

export const RecommendationDetailWeekDetails:FC<Props> = ({detailsData}) => {
    const {t} = useTranslation();
    
    return (
        <div className="mb-4">
            <p>{t("Week suggestions: ")}{detailsData.week_sug}</p>
            <p>{t("Week all: ")}{detailsData.week_all}</p>
            {detailsData.week_all_profit &&
                <p>{t("Week all profit: ")}{toPercentTwoDecimal(detailsData.week_all_profit)} %</p>}
            <p>{t("Positions in week 0: ")}{detailsData.week_0_pos}</p>
            {detailsData.week_0_profit &&
                <p>{t("Week 0 profit: ")}{toPercentTwoDecimal(detailsData.week_0_profit)} %</p>}
            {detailsData.week_1_pos &&
                <p>{t("Week 1 position: ")}{detailsData.week_1_pos}</p>}
            {detailsData.week_1_profit &&
                <p>{t("Week 1 profit: ")}{toPercentTwoDecimal(detailsData.week_1_profit)} %</p>}
            {detailsData.week_2_pos &&
                <p>{t("Week 2 position: ")}{detailsData.week_2_pos}</p>}
            {detailsData.week_2_profit &&
                <p>{t("Week 2 profit: ")}{toPercentTwoDecimal(detailsData.week_2_profit)} %</p>}
            {detailsData.week_3_pos &&
                <p>{t("Week 3 position: ")}{detailsData.week_3_pos}</p>}
            {detailsData.week_3_profit &&
                <p>{t("Week 3 profit: ")}{toPercentTwoDecimal(detailsData.week_3_profit)} %</p>}
        </div>
    );
}