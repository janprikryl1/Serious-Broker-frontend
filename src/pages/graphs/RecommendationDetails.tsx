import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {TitleHeader} from "../../components/modules/about/TitleHeader.tsx";
import {getBinanceIndexAssetRecomBestPreviousDetail} from "../../api/GraphsService.ts";
import {BinanceIndexAssetRecomBestPreviousDetails} from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousDetails.ts";
import {useTranslation} from "react-i18next";
import {RecommendationDetailsSkeleton} from "../../components/modules/graphs/RecommendationDetailsSkeleton.tsx";
import {convertUTCToLocalTime, getDayName, getYear} from "../../utils/constants";

export const RecommendationDetails:FC = () => {
    const {t} = useTranslation();
    const {asset_label} = useParams();
    const [detailsData, setDetailsData] = useState<BinanceIndexAssetRecomBestPreviousDetails>();

    useEffect(() => {
        if (!asset_label) return;
        const getData = async () => {
            try {
            const res = await getBinanceIndexAssetRecomBestPreviousDetail(asset_label);
            setDetailsData(res.data);
            } catch (e) {
                console.error(e);
            }
        };
        getData();
    }, []);
    
    return (
        <>
            {asset_label && <TitleHeader title={asset_label} />}
            {detailsData ? (
                <>
                    <div className="padding-bottom padding-top">
                        <div className="container padding-bottom">
                            <div className="service-details__wrapper">
                                <div className="service-details__item">
                                    <div className="service-details__item-inner">
                                        <h5 className="10 style2">{detailsData.asset_label}</h5>
                                        <p>{t("Quote currencies: ")}{detailsData.quote_currencies}</p>
                                        <p>{t("Best of all index: ")}{detailsData.all_pos}</p>
                                        <p>{t("All suggestions: ")}{detailsData.all_sug}</p>
                                        <p>{t("cmc_rank")}: {detailsData.cmc_rank}</p>

                                        <br/>

                                        <p>{t("Week suggestions: ")}{detailsData.week_sug}</p>
                                        <p>{t("Week all: ")}{detailsData.week_all}</p>
                                        <p>{t("Week all profit: ")}{detailsData.week_all_profit}</p>
                                        <p>{t("Positions in week 0: ")}{detailsData.week_0_pos}</p>
                                        <p>{t("Week 0 profit: ")}{detailsData.week_0_profit}</p>
                                        <p>{t("Week 1 position: ")}{detailsData.week_1_pos}</p>
                                        <p>{t("Week 1 profit: ")}{detailsData.week_1_profit}</p>
                                        <p>{t("Week 2 position: ")}{detailsData.week_2_pos}</p>
                                        <p>{t("Week 2 profit: ")}{detailsData.week_2_profit}</p>
                                        <p>{t("Week 3 position: ")}{detailsData.week_3_pos}</p>
                                        <p>{t("Week 3 profit: ")}{detailsData.week_3_profit}</p>

                                        <br/>

                                        <p>{t("Month suggestion: ")}{detailsData.month_sug}</p>
                                        <p>{t("Month all: ")}{detailsData.month_all}</p>
                                        <p>{t("Month all profit: ")}{detailsData.month_all_profit}</p>
                                        <p>{t("Positions in month 0: ")}{detailsData.month_0_pos}</p>
                                        <p>{t("Month 0 profit: ")}{detailsData.month_0_profit}</p>
                                        <p>{t("Positions in month 1: ")}{detailsData.month_1_pos}</p>
                                        <p>{t("Month 1 profit: ")}{detailsData.month_1_profit}</p>
                                        <p>{t("Positions in month 2: ")}{detailsData.month_2_pos}</p>
                                        <p>{t("Month 2 profit: ")}{detailsData.month_2_profit}</p>

                                        <br/>

                                        <p>{t("Quarter suggestion: ")}{detailsData.quarter_sug}</p>
                                        <p>{t("Quarter all: ")}{detailsData.quarter_all}</p>
                                        <p>{t("Quarter all profit: ")}{detailsData.quarter_all_profit}</p>
                                        <p>{t("Positions in quarter 0: ")}{detailsData.quarter_0_pos}</p>
                                        <p>{t("Quarter 0 profit: ")}{detailsData.quarter_0_profit}</p>
                                        <p>{t("Positions in quarter 1: ")}{detailsData.quarter_1_pos}</p>
                                        <p>{t("Quarter 1 profit: ")}{detailsData.quarter_1_profit}</p>
                                        <p>{t("Positions in quarter 2: ")}{detailsData.quarter_2_pos}</p>
                                        <p>{t("Quarter 2 profit: ")}{detailsData.quarter_2_profit}</p>
                                        <p>{t("Quarter 3 position: ")}{detailsData.quarter_3_pos}</p>
                                        <p>{t("Quarter 3 profit: ")}{detailsData.quarter_3_profit}</p>

                                        <br/>

                                        {detailsData.year_sug && <p>{t("Year suggestion: ")}{detailsData.year_sug}</p>}
                                        {detailsData.year_all && <p>{t("Year all: ")}{detailsData.year_all}</p>}
                                        {detailsData.year_all_profit && <p>{t("Year all profit: ")}{detailsData.year_all_profit}</p>}
                                        {detailsData.year_0_pos && <p>{t("Positions in year 0: ")}{detailsData.year_0_pos}</p>}
                                        {detailsData.year_0_profit && <p>{t("Year 0 profit: ")}{detailsData.year_0_profit}</p>}
                                        {detailsData.year_1_pos && <p>{t("Positions in year 1: ")}{detailsData.year_1_pos}</p>}
                                        {detailsData.year_1_profit && <p>{t("Year 1 profit: ")}{detailsData.year_1_profit}</p>}
                                        {detailsData.year_2_pos && <p>{t("Positions in year 2: ")}{detailsData.year_2_pos}</p>}
                                        {detailsData.year_2_profit && <p>{t("Year 2 profit: ")}{detailsData.year_2_profit}</p>}

                                        <i>{t("Ranking description")}</i>
                                        <br/>
                                        <i>{t("Invest description")}</i>

                                        <br/>
                                        <h3>{t("When to buy")}</h3>
                                        {detailsData.buy_week_0_week_day && detailsData.buy_week_0_hour &&
                                            <p>{t("Last week's recommendations: ")}{getDayName(detailsData.buy_week_0_week_day)} {convertUTCToLocalTime(detailsData.buy_week_0_hour)}</p>}
                                        {detailsData.buy_week_1_week_day && detailsData.buy_week_1_hour &&
                                            <p>{t("Previous week's recommendations: ")}{getDayName(detailsData.buy_week_1_week_day)} {convertUTCToLocalTime(detailsData.buy_week_1_hour)}</p>}
                                        {detailsData.buy_week_2_week_day && detailsData.buy_week_2_hour &&
                                            <p>{t("Recommendations for the week before last: ")}{getDayName(detailsData.buy_week_2_week_day)} {convertUTCToLocalTime(detailsData.buy_week_2_hour)}</p>}
                                        {detailsData.buy_week_3_week_day && detailsData.buy_week_3_hour &&
                                            <p>{t("Recommendations from the week before last: ")}{getDayName(detailsData.buy_week_3_week_day)} {convertUTCToLocalTime(detailsData.buy_week_3_hour)}</p>}
                                        {detailsData.buy_month_0_week_day && detailsData.buy_month_0_hour &&
                                            <p>{t("Last month's recommendations: ")}{getDayName(detailsData.buy_month_0_week_day)} {convertUTCToLocalTime(detailsData.buy_month_0_hour)}</p>}
                                        {detailsData.buy_month_1_week_day && detailsData.buy_month_1_hour &&
                                            <p>{t("Previous month's recommendations: ")}{getDayName(detailsData.buy_month_1_week_day)} {convertUTCToLocalTime(detailsData.buy_month_1_hour)}</p>}
                                        {detailsData.buy_month_2_week_day && detailsData.buy_month_2_hour &&
                                            <p>{t("Recommendations for the month before last: ")}{getDayName(detailsData.buy_month_2_week_day)} {convertUTCToLocalTime(detailsData.buy_month_2_hour)}</p>}
                                        {detailsData.buy_quarter_0_week_day && detailsData.buy_quarter_0_hour &&
                                            <p>{t("Recommendations for the last quarter: ")}{t("Quarter: ")} {detailsData.buy_quarter_0_week_day} {convertUTCToLocalTime(detailsData.buy_quarter_0_hour)}</p>}
                                        {detailsData.buy_quarter_1_week_day && detailsData.buy_quarter_1_hour &&
                                            <p>{t("Recommendations for the previous quarter: ")} {t("Quarter: ")} {detailsData.buy_quarter_1_week_day} {convertUTCToLocalTime(detailsData.buy_quarter_1_hour)}</p>}
                                        {detailsData.buy_quarter_2_week_day && detailsData.buy_quarter_2_hour &&
                                            <p>{t("Recommendations for the previous quarter")} {t("Quarter: ")} {detailsData.buy_quarter_2_week_day} {convertUTCToLocalTime(detailsData.buy_quarter_2_hour)}</p>}
                                        {detailsData.buy_quarter_3_week_day && detailsData.buy_quarter_3_hour &&
                                            <p>{t("Recommendations for the quarter before previous: ")} {t("Quarter: ")} {detailsData.buy_quarter_3_week_day} {convertUTCToLocalTime(detailsData.buy_quarter_3_hour)}</p>}
                                        {detailsData.buy_year_0_week_day && detailsData.buy_year_0_hour &&
                                            <p>{t("Recommendations for last year: ")} {getYear(detailsData.buy_year_0_week_day)} {convertUTCToLocalTime(detailsData.buy_year_0_hour)}</p>}
                                        {detailsData.buy_year_1_week_day && detailsData.buy_year_1_hour &&
                                            <p>{t("Recommendations for previous year: ")} {getYear(detailsData.buy_year_1_week_day)} {convertUTCToLocalTime(detailsData.buy_year_1_hour)}</p>}
                                        {detailsData.buy_year_2_week_day && detailsData.buy_year_2_hour &&
                                            <p>{t("Recommendations for the year before previous: ")} {getYear(detailsData.buy_year_2_week_day)} {convertUTCToLocalTime(detailsData.buy_year_2_hour)}</p>}


                                        <h3>{t("When to sell")}</h3>
                                        {detailsData.sell_week_0_week_day && detailsData.sell_week_0_hour && <p>{t("Last week's recommendations: ")} {getDayName(detailsData.sell_week_0_week_day)} {convertUTCToLocalTime(detailsData.sell_week_0_hour)}</p>}
                                        {detailsData.sell_week_1_week_day && detailsData.sell_week_1_hour && <p>{t("Previous week's recommendations: ")} {getDayName(detailsData.sell_week_1_week_day)} {convertUTCToLocalTime(detailsData.sell_week_1_hour)}</p>}
                                        {detailsData.sell_week_2_week_day && detailsData.sell_weekr_2_hour && <p>{t("Recommendations for the week before last: ")} {getDayName(detailsData.sell_week_2_week_day)} {convertUTCToLocalTime(detailsData.sell_weekr_2_hour)}</p>}
                                        {detailsData.sell_week_3_week_day && detailsData.sell_week_3_hour && <p>{t("Recommendations from the week before last: ")} {getDayName(detailsData.sell_week_3_week_day)} {convertUTCToLocalTime(detailsData.sell_week_3_hour)}</p>}
                                        {detailsData.sell_month_0_week_day && detailsData.sell_month_0_hour && <p>{t("Last month's recommendations: ")} {getDayName(detailsData.sell_month_0_week_day)} {convertUTCToLocalTime(detailsData.sell_month_0_hour)}</p>}
                                        {detailsData.sell_month_1_week_day && detailsData.sell_month_1_hour && <p>{t("Previous month's recommendations: ")} {getDayName(detailsData.sell_month_1_week_day)} {convertUTCToLocalTime(detailsData.sell_month_1_hour)}</p>}
                                        {detailsData.sell_month_2_week_day && detailsData.sell_month_2_hour && <p>{t("Recommendations for the last quarter: ")} {getDayName(detailsData.sell_month_2_week_day)} {convertUTCToLocalTime(detailsData.sell_month_2_hour)}</p>}
                                        {detailsData.sell_quarter_0_week_day && detailsData.sell_quarter_0_hour && <p>{t("Recommendations for the last quarter: ")} {t("Quarter: ")} {detailsData.sell_quarter_0_week_day} {convertUTCToLocalTime(detailsData.sell_quarter_0_hour)}</p>}
                                        {detailsData.sell_quarter_1_week_day && detailsData.sell_quarter_1_hour && <p>{t("Recommendations for the previous quarter: ")} {t("Quarter: ")} {detailsData.sell_quarter_1_week_day} {convertUTCToLocalTime(detailsData.sell_quarter_1_hour)}</p>}
                                        {detailsData.sell_quarter_2_week_day && detailsData.sell_quarter_2_hour && <p>{t("Recommendations for the previous quarter")} {t("Quarter: ")} {detailsData.sell_quarter_2_week_day} {convertUTCToLocalTime(detailsData.sell_quarter_2_hour)}</p>}
                                        {detailsData.sell_quarter_3_week_day && detailsData.sell_quarter_3_hour && <p>{t("Recommendations for the quarter before previous: ")} {t("Quarter: ")} {detailsData.sell_quarter_3_week_day} {convertUTCToLocalTime(detailsData.sell_quarter_3_hour)}</p>}
                                        {detailsData.sell_year_0_week_day && detailsData.sell_year_0_hour && <p>{t("Recommendations for last year: ")} {getYear(detailsData.sell_year_0_week_day)} {convertUTCToLocalTime(detailsData.sell_year_0_hour)}</p>}
                                        {detailsData.sell_year_1_week_day && detailsData.sell_year_1_hour && <p>{t("Recommendations for previous year: ")} {getYear(detailsData.sell_year_1_week_day)} {convertUTCToLocalTime(detailsData.sell_year_1_hour)}</p>}
                                        {detailsData.sell_year_2_week_day && detailsData.sell_year_2_hour && <p>{t("Recommendations for the year before previous: ")} {getYear(detailsData.sell_year_2_week_day)} {convertUTCToLocalTime(detailsData.sell_year_2_hour)}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : <RecommendationDetailsSkeleton />}
            
        </>
    );
};