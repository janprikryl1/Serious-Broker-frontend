import {FC} from "react";
import {toPercentTwoDecimal} from "../../utils/functions/functions.ts";
import { BinanceIndexAssetRecomBestPreviousDetails } from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousDetails.ts";
import {useTranslation} from "react-i18next";

type Props = {
    detailsData: BinanceIndexAssetRecomBestPreviousDetails;
}

export const RecommendationDetailsQuarterDetails:FC<Props> = ({detailsData}) => {
    const {t} = useTranslation();
    
    return (
        <div className="mb-4">
            {detailsData.quarter_sug &&
                <p>{t("Quarter suggestion: ")}{detailsData.quarter_sug}</p>}
            {detailsData.quarter_all &&
                <p>{t("Quarter all: ")}{detailsData.quarter_all}</p>}
            {detailsData.quarter_all_profit &&
                <p>{t("Quarter all profit: ")}{detailsData.quarter_all_profit}</p>}
            <p>{t("Positions in quarter 0: ")}{detailsData.quarter_0_pos}</p>
            {detailsData.quarter_0_profit &&
                <p>{t("Quarter 0 profit: ")}{toPercentTwoDecimal(detailsData.quarter_0_profit)}</p>}
            <p>{t("Positions in quarter 1: ")}{detailsData.quarter_1_pos}</p>
            {detailsData.quarter_1_profit &&
                <p>{t("Quarter 1 profit: ")}{toPercentTwoDecimal(detailsData.quarter_1_profit)}</p>}
            {detailsData.quarter_2_pos &&
                <p>{t("Positions in quarter 2: ")}{detailsData.quarter_2_pos}</p>}
            {detailsData.quarter_2_profit &&
                <p>{t("Quarter 2 profit: ")}{toPercentTwoDecimal(detailsData.quarter_2_profit)}</p>}
            {detailsData.quarter_3_pos &&
                <p>{t("Quarter 3 position: ")}{detailsData.quarter_3_pos}</p>}
            {detailsData.quarter_3_profit &&
                <p>{t("Quarter 3 profit: ")}{toPercentTwoDecimal(detailsData.quarter_3_profit)}</p>}
        </div>
    );
}