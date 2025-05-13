import { FC } from "react";
import { convertUTCToLocalTime, getDayName, getYear } from "../../utils/functions/dateFunctions.ts";
import { useTranslation } from "react-i18next";
import { BinanceIndexAssetRecomBestPreviousDetails } from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousDetails.ts";

type Props = {
    detailsData: BinanceIndexAssetRecomBestPreviousDetails;
}

export const isValid = (value: number | null | undefined): value is number =>
    value !== null && value !== 0 && value !== undefined;

export const RecommendationDetailsSell: FC<Props> = ({ detailsData }) => {
    const { t } = useTranslation();

    return (
        <>
            {isValid(detailsData.sell_week_0_week_day) && isValid(detailsData.sell_week_0_hour) &&
                <p>{t("Last week's recommendations: ")} {t(getDayName(detailsData.sell_week_0_week_day))} {convertUTCToLocalTime(detailsData.sell_week_0_hour)}</p>}
            {isValid(detailsData.sell_week_1_week_day) && isValid(detailsData.sell_week_1_hour) &&
                <p>{t("Previous week's recommendations: ")} {t(getDayName(detailsData.sell_week_1_week_day))} {convertUTCToLocalTime(detailsData.sell_week_1_hour)}</p>}
            {isValid(detailsData.sell_week_2_week_day) && isValid(detailsData.sell_week_2_hour) &&
                <p>{t("Recommendations for the week before last: ")} {t(getDayName(detailsData.sell_week_2_week_day))} {convertUTCToLocalTime(detailsData.sell_week_2_hour)}</p>}
            {isValid(detailsData.sell_week_3_week_day) && isValid(detailsData.sell_week_3_hour) &&
                <p>{t("Recommendations from the week before last: ")} {t(getDayName(detailsData.sell_week_3_week_day))} {convertUTCToLocalTime(detailsData.sell_week_3_hour)}</p>}
            {isValid(detailsData.sell_month_0_week_day) && isValid(detailsData.sell_month_0_hour) &&
                <p>{t("Last month's recommendations: ")} {t(getDayName(detailsData.sell_month_0_week_day))} {convertUTCToLocalTime(detailsData.sell_month_0_hour)}</p>}
            {isValid(detailsData.sell_month_1_week_day) && isValid(detailsData.sell_month_1_hour) &&
                <p>{t("Previous month's recommendations: ")} {t(getDayName(detailsData.sell_month_1_week_day))} {convertUTCToLocalTime(detailsData.sell_month_1_hour)}</p>}
            {isValid(detailsData.sell_month_2_week_day) && isValid(detailsData.sell_month_2_hour) &&
                <p>{t("Recommendations for the last quarter: ")} {t(getDayName(detailsData.sell_month_2_week_day))} {convertUTCToLocalTime(detailsData.sell_month_2_hour)}</p>}
            {isValid(detailsData.sell_quarter_0_week_day) && isValid(detailsData.sell_quarter_0_hour) &&
                <p>{t("Recommendations for the last quarter: ")} {t("Quarter: ")} {detailsData.sell_quarter_0_week_day} {convertUTCToLocalTime(detailsData.sell_quarter_0_hour)}</p>}
            {isValid(detailsData.sell_quarter_1_week_day) && isValid(detailsData.sell_quarter_1_hour) &&
                <p>{t("Recommendations for the previous quarter: ")} {t("Quarter: ")} {detailsData.sell_quarter_1_week_day} {convertUTCToLocalTime(detailsData.sell_quarter_1_hour)}</p>}
            {isValid(detailsData.sell_quarter_2_week_day) && isValid(detailsData.sell_quarter_2_hour) &&
                <p>{t("Recommendations for the previous quarter: ")} {t("Quarter: ")} {detailsData.sell_quarter_2_week_day} {convertUTCToLocalTime(detailsData.sell_quarter_2_hour)}</p>}
            {isValid(detailsData.sell_quarter_3_week_day) && isValid(detailsData.sell_quarter_3_hour) &&
                <p>{t("Recommendations for the quarter before previous: ")} {t("Quarter: ")} {detailsData.sell_quarter_3_week_day} {convertUTCToLocalTime(detailsData.sell_quarter_3_hour)}</p>}
            {isValid(detailsData.sell_year_0_week_day) && isValid(detailsData.sell_year_0_hour) &&
                <p>{t("Recommendations for last year: ")} {getYear(detailsData.sell_year_0_week_day)} {convertUTCToLocalTime(detailsData.sell_year_0_hour)}</p>}
            {isValid(detailsData.sell_year_1_week_day) && isValid(detailsData.sell_year_1_hour) &&
                <p>{t("Recommendations for previous year: ")} {getYear(detailsData.sell_year_1_week_day)} {convertUTCToLocalTime(detailsData.sell_year_1_hour)}</p>}
            {isValid(detailsData.sell_year_2_week_day) && isValid(detailsData.sell_year_2_hour) &&
                <p>{t("Recommendations for the year before previous: ")} {getYear(detailsData.sell_year_2_week_day)} {convertUTCToLocalTime(detailsData.sell_year_2_hour)}</p>}
        </>
    );
}
