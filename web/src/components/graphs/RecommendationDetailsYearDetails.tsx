import {FC} from "react";
import {toPercentTwoDecimal} from "../../utils/functions/functions.ts";
import { useTranslation } from "react-i18next";
import { BinanceIndexAssetRecomBestPreviousDetails } from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousDetails.ts";

type Props = {
    detailsData: BinanceIndexAssetRecomBestPreviousDetails;
}

export const RecommendationDetailsYearDetails:FC<Props> = ({detailsData}) => {
    const {t} = useTranslation();
    
    return (
        <div className="mb-4">
            {detailsData.year_sug &&
                <p>{t("Year suggestion: ")}{detailsData.year_sug}</p>}
            {detailsData.year_all &&
                <p>{t("Year all: ")}{detailsData.year_all}</p>}
            {detailsData.year_all_profit &&
                <p>{t("Year all profit: ")}{toPercentTwoDecimal(detailsData.year_all_profit)}</p>}
            {detailsData.year_0_pos &&
                <p>{t("Positions in year 0: ")}{detailsData.year_0_pos}</p>}
            {detailsData.year_0_profit &&
                <p>{t("Year 0 profit: ")}{toPercentTwoDecimal(detailsData.year_0_profit)}</p>}
            {detailsData.year_1_pos &&
                <p>{t("Positions in year 1: ")}{detailsData.year_1_pos}</p>}
            {detailsData.year_1_profit &&
                <p>{t("Year 1 profit: ")}{toPercentTwoDecimal(detailsData.year_1_profit)}</p>}
            {detailsData.year_2_pos &&
                <p>{t("Positions in year 2: ")}{detailsData.year_2_pos}</p>}
            {detailsData.year_2_profit &&
                <p>{t("Year 2 profit: ")}{toPercentTwoDecimal(detailsData.year_2_profit)}</p>}
        </div>
    );
}