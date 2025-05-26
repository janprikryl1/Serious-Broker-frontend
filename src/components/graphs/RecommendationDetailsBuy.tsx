import {FC} from "react";
import {convertUTCToLocalTime, getDayName, getYear} from "../../utils/functions/dateFunctions.ts";
import { useTranslation } from "react-i18next";
import { BinanceIndexAssetRecomBestPreviousDetails } from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousDetails.ts";
import {isValid} from "./RecommendationDetailsSell.tsx";

type Props = {
    detailsData: BinanceIndexAssetRecomBestPreviousDetails;
}

export const RecommendationDetailsBuy:FC<Props> = ({detailsData}) => {
    const {t} = useTranslation();
    
    return (
        <div className="col-sm">
            {isValid(detailsData.buy_week_0_week_day) && isValid(detailsData.buy_week_0_hour) &&
                <p><strong>{t("Last week's recommendations: ")}{t(getDayName(detailsData.buy_week_0_week_day))} {convertUTCToLocalTime(detailsData.buy_week_0_hour)}</strong></p>}
            {isValid(detailsData.buy_week_1_week_day) && isValid(detailsData.buy_week_1_hour) &&
                <p>{t("Previous week's recommendations: ")}{t(getDayName(detailsData.buy_week_1_week_day))} {convertUTCToLocalTime(detailsData.buy_week_1_hour)}</p>}
            {isValid(detailsData.buy_week_2_week_day) && isValid(detailsData.buy_week_2_hour) &&
                <p>{t("Recommendations for the week before last: ")}{t(getDayName(detailsData.buy_week_2_week_day))} {convertUTCToLocalTime(detailsData.buy_week_2_hour)}</p>}
            {isValid(detailsData.buy_week_3_week_day) && isValid(detailsData.buy_week_3_hour) &&
                <p>{t("Recommendations from the week before last: ")}{t(getDayName(detailsData.buy_week_3_week_day))} {convertUTCToLocalTime(detailsData.buy_week_3_hour)}</p>}
            {isValid(detailsData.buy_month_0_week_day) && isValid(detailsData.buy_month_0_hour) &&
                <p>{t("Last month's recommendations: ")}{t(getDayName(detailsData.buy_month_0_week_day))} {convertUTCToLocalTime(detailsData.buy_month_0_hour)}</p>}
            {isValid(detailsData.buy_month_1_week_day) && isValid(detailsData.buy_month_1_hour) &&
                <p>{t("Previous month's recommendations: ")}{t(getDayName(detailsData.buy_month_1_week_day))} {convertUTCToLocalTime(detailsData.buy_month_1_hour)}</p>}
            {isValid(detailsData.buy_month_2_week_day) && isValid(detailsData.buy_month_2_hour) &&
                <p>{t("Recommendations for the month before last: ")}{t(getDayName(detailsData.buy_month_2_week_day))} {convertUTCToLocalTime(detailsData.buy_month_2_hour)}</p>}
            {isValid(detailsData.buy_quarter_0_week_day) && isValid(detailsData.buy_quarter_0_hour) &&
                <p>{t("Recommendations for the last quarter: ")}{t("Quarter: ")} {detailsData.buy_quarter_0_week_day} {convertUTCToLocalTime(detailsData.buy_quarter_0_hour)}</p>}
            {isValid(detailsData.buy_quarter_1_week_day) && isValid(detailsData.buy_quarter_1_hour) &&
                <p>{t("Recommendations for the last quarter: ")} {t("Quarter: ")} {detailsData.buy_quarter_1_week_day} {convertUTCToLocalTime(detailsData.buy_quarter_1_hour)}</p>}
            {isValid(detailsData.buy_quarter_2_week_day) && isValid(detailsData.buy_quarter_2_hour) &&
                <p>{t("Recommendations for the previous quarter: ")} {t("Quarter: ")} {detailsData.buy_quarter_2_week_day} {convertUTCToLocalTime(detailsData.buy_quarter_2_hour)}</p>}
            {isValid(detailsData.buy_quarter_3_week_day) && isValid(detailsData.buy_quarter_3_hour) &&
                <p>{t("Recommendations for the quarter before previous: ")} {t("Quarter: ")} {detailsData.buy_quarter_3_week_day} {convertUTCToLocalTime(detailsData.buy_quarter_3_hour)}</p>}
            {isValid(detailsData.buy_year_0_week_day) && isValid(detailsData.buy_year_0_hour) &&
                <p>{t("Recommendations for last year: ")} {getYear(detailsData.buy_year_0_week_day)} {convertUTCToLocalTime(detailsData.buy_year_0_hour)}</p>}
            {isValid(detailsData.buy_year_1_week_day) && isValid(detailsData.buy_year_1_hour) &&
                <p>{t("Recommendations for previous year: ")} {getYear(detailsData.buy_year_1_week_day)} {convertUTCToLocalTime(detailsData.buy_year_1_hour)}</p>}
            {isValid(detailsData.buy_year_2_week_day) && isValid(detailsData.buy_year_2_hour) &&
                <p>{t("Recommendations for the year before previous: ")} {getYear(detailsData.buy_year_2_week_day)} {convertUTCToLocalTime(detailsData.buy_year_2_hour)}</p>}
        </div>
    );
}