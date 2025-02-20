import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {BinanceIndexAssetRecomBestPreviousDetails} from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousDetails.ts";
import {useTranslation} from "react-i18next";
import {convertUTCToLocalTime, getDayName, getYear, toPercentTwoDecimal} from "../../utils/constants/functions.ts";
import {getBinanceIndexAssetRecomBestPreviousDetail} from "../../utils/api/GraphsService.ts";
import {TitleHeader} from "../../components/about/TitleHeader.tsx";
import {SeasonButton} from "../../components/index/SeasonButton.tsx";
import {RecommendationDetailsSkeleton} from "../../components/graphs/RecommendationDetailsSkeleton.tsx";

export const RecommendationDetails:FC = () => {
    const {t} = useTranslation();
    const {asset_label} = useParams();
    const [detailsData, setDetailsData] = useState<BinanceIndexAssetRecomBestPreviousDetails>();
    const [selectedPeriod, setSelectedPeriod] = useState<'Week' | 'Month' | 'Quarter' | 'Year'>("Week");
    const [selectedDropdown, setSelectedDropdown] = useState<string>("buy");

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
            {detailsData ? (
                <>
                    <TitleHeader title={`${detailsData.asset_label} - ${detailsData.name}`} />
                        <div className="container graph-container">
                            <div className="service-details__wrapper">
                                <div className="service-details__item">
                                    <div className="service-details__item-inner mb-5">
                                            <h5 className="index-title">{t("Quote currencies: ")}{detailsData.quote_currencies}</h5>
                                            {detailsData.all_pos !== null &&
                                                <p>{t("Best of all index: ")}{detailsData.all_pos}</p>}
                                            {detailsData.all_sug !== null &&
                                                <p>{t("All suggestions: ")}{detailsData.all_sug}</p>}
                                            {detailsData.cmc_rank !== null &&
                                                <p>{t("cmc_rank")}: {detailsData.cmc_rank}</p>}


                                            <div className="col-sm season-button-group d-flex gap-3 mb-25" style={{maxWidth: 400}}>
                                                <SeasonButton
                                                    seasonValue="Week"
                                                    isActive={"Week" === selectedPeriod}
                                                    onSelect={() => setSelectedPeriod("Week")}
                                                />
                                                <SeasonButton
                                                    seasonValue="Month"
                                                    isActive={"Month" === selectedPeriod}
                                                    onSelect={() => setSelectedPeriod("Month")}
                                                />
                                                <SeasonButton
                                                    seasonValue="Quarter"
                                                    isActive={"Quarter" === selectedPeriod}
                                                    onSelect={() => setSelectedPeriod("Quarter")}
                                                />
                                                <SeasonButton
                                                    seasonValue="Year"
                                                    isActive={"Year" === selectedPeriod}
                                                    onSelect={() => setSelectedPeriod("Year")}
                                                />
                                            </div>

                                            {selectedPeriod === "Week" ? (
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
                                            ) : selectedPeriod === "Month" ? (
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
                                            ) : selectedPeriod === "Quarter" ? (
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
                                            ) : selectedPeriod === "Year" ? (
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
                                            ) : null}
                                            <div className="mb-5">
                                                <i>{t("Ranking description")}</i>
                                                <br/>
                                                <i>{t("Invest description")}</i>
                                            </div>

                                            <div className="d-flex align-items-center mt-4 mb-2" style={{maxWidth: "250px"}}>
                                                <label htmlFor="selectedDropdown"
                                                       className="form-label me-2">{t("Recommendation for")}</label>
                                                <select
                                                    id="selectedDropdown"
                                                    className="form-select mb-2"
                                                    value={selectedDropdown}
                                                    onChange={(e) => setSelectedDropdown(e.target.value)}
                                                >
                                                    <option value="buy">{t("When to buy")}</option>
                                                    <option value="sell">{t("When to sell")}</option>
                                                </select>
                                            </div>
                                            {selectedDropdown === "buy" && (
                                                <>
                                                    {detailsData.buy_week_0_week_day && detailsData.buy_week_0_hour &&
                                                        <p>{t("Last week's recommendations: ")}{t(getDayName(detailsData.buy_week_0_week_day))} {convertUTCToLocalTime(detailsData.buy_week_0_hour)}</p>}
                                                    {detailsData.buy_week_1_week_day && detailsData.buy_week_1_hour &&
                                                        <p>{t("Previous week's recommendations: ")}{t(getDayName(detailsData.buy_week_1_week_day))} {convertUTCToLocalTime(detailsData.buy_week_1_hour)}</p>}
                                                    {detailsData.buy_week_2_week_day && detailsData.buy_week_2_hour &&
                                                        <p>{t("Recommendations for the week before last: ")}{t(getDayName(detailsData.buy_week_2_week_day))} {convertUTCToLocalTime(detailsData.buy_week_2_hour)}</p>}
                                                    {detailsData.buy_week_3_week_day && detailsData.buy_week_3_hour &&
                                                        <p>{t("Recommendations from the week before last: ")}{t(getDayName(detailsData.buy_week_3_week_day))} {convertUTCToLocalTime(detailsData.buy_week_3_hour)}</p>}
                                                    {detailsData.buy_month_0_week_day && detailsData.buy_month_0_hour &&
                                                        <p>{t("Last month's recommendations: ")}{t(getDayName(detailsData.buy_month_0_week_day))} {convertUTCToLocalTime(detailsData.buy_month_0_hour)}</p>}
                                                    {detailsData.buy_month_1_week_day && detailsData.buy_month_1_hour &&
                                                        <p>{t("Previous month's recommendations: ")}{t(getDayName(detailsData.buy_month_1_week_day))} {convertUTCToLocalTime(detailsData.buy_month_1_hour)}</p>}
                                                    {detailsData.buy_month_2_week_day && detailsData.buy_month_2_hour &&
                                                        <p>{t("Recommendations for the month before last: ")}{t(getDayName(detailsData.buy_month_2_week_day))} {convertUTCToLocalTime(detailsData.buy_month_2_hour)}</p>}
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
                                                </>
                                            )}

                                            {selectedDropdown === "sell" && (
                                                <>
                                                    {detailsData.sell_week_0_week_day && detailsData.sell_week_0_hour &&
                                                        <p>{t("Last week's recommendations: ")} {t(getDayName(detailsData.sell_week_0_week_day))} {convertUTCToLocalTime(detailsData.sell_week_0_hour)}</p>}
                                                    {detailsData.sell_week_1_week_day && detailsData.sell_week_1_hour &&
                                                        <p>{t("Previous week's recommendations: ")} {t(getDayName(detailsData.sell_week_1_week_day))} {convertUTCToLocalTime(detailsData.sell_week_1_hour)}</p>}
                                                    {detailsData.sell_week_2_week_day && detailsData.sell_weekr_2_hour &&
                                                        <p>{t("Recommendations for the week before last: ")} {t(getDayName(detailsData.sell_week_2_week_day))} {convertUTCToLocalTime(detailsData.sell_weekr_2_hour)}</p>}
                                                    {detailsData.sell_week_3_week_day && detailsData.sell_week_3_hour &&
                                                        <p>{t("Recommendations from the week before last: ")} {t(getDayName(detailsData.sell_week_3_week_day))} {convertUTCToLocalTime(detailsData.sell_week_3_hour)}</p>}
                                                    {detailsData.sell_month_0_week_day && detailsData.sell_month_0_hour &&
                                                        <p>{t("Last month's recommendations: ")} {t(getDayName(detailsData.sell_month_0_week_day))} {convertUTCToLocalTime(detailsData.sell_month_0_hour)}</p>}
                                                    {detailsData.sell_month_1_week_day && detailsData.sell_month_1_hour &&
                                                        <p>{t("Previous month's recommendations: ")} {t(getDayName(detailsData.sell_month_1_week_day))} {convertUTCToLocalTime(detailsData.sell_month_1_hour)}</p>}
                                                    {detailsData.sell_month_2_week_day && detailsData.sell_month_2_hour &&
                                                        <p>{t("Recommendations for the last quarter: ")} {t(getDayName(detailsData.sell_month_2_week_day))} {convertUTCToLocalTime(detailsData.sell_month_2_hour)}</p>}
                                                    {detailsData.sell_quarter_0_week_day && detailsData.sell_quarter_0_hour &&
                                                        <p>{t("Recommendations for the last quarter: ")} {t("Quarter: ")} {detailsData.sell_quarter_0_week_day} {convertUTCToLocalTime(detailsData.sell_quarter_0_hour)}</p>}
                                                    {detailsData.sell_quarter_1_week_day && detailsData.sell_quarter_1_hour &&
                                                        <p>{t("Recommendations for the previous quarter: ")} {t("Quarter: ")} {detailsData.sell_quarter_1_week_day} {convertUTCToLocalTime(detailsData.sell_quarter_1_hour)}</p>}
                                                    {detailsData.sell_quarter_2_week_day && detailsData.sell_quarter_2_hour &&
                                                        <p>{t("Recommendations for the previous quarter")} {t("Quarter: ")} {detailsData.sell_quarter_2_week_day} {convertUTCToLocalTime(detailsData.sell_quarter_2_hour)}</p>}
                                                    {detailsData.sell_quarter_3_week_day && detailsData.sell_quarter_3_hour &&
                                                        <p>{t("Recommendations for the quarter before previous: ")} {t("Quarter: ")} {detailsData.sell_quarter_3_week_day} {convertUTCToLocalTime(detailsData.sell_quarter_3_hour)}</p>}
                                                    {detailsData.sell_year_0_week_day && detailsData.sell_year_0_hour &&
                                                        <p>{t("Recommendations for last year: ")} {getYear(detailsData.sell_year_0_week_day)} {convertUTCToLocalTime(detailsData.sell_year_0_hour)}</p>}
                                                    {detailsData.sell_year_1_week_day && detailsData.sell_year_1_hour &&
                                                        <p>{t("Recommendations for previous year: ")} {getYear(detailsData.sell_year_1_week_day)} {convertUTCToLocalTime(detailsData.sell_year_1_hour)}</p>}
                                                    {detailsData.sell_year_2_week_day && detailsData.sell_year_2_hour &&
                                                        <p>{t("Recommendations for the year before previous: ")} {getYear(detailsData.sell_year_2_week_day)} {convertUTCToLocalTime(detailsData.sell_year_2_hour)}</p>}
                                                </>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                </>
            ) : <RecommendationDetailsSkeleton/>}
        </>
    );
};