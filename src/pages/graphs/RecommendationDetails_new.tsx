import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {BinanceIndexAssetRecomBestPreviousDetails} from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousDetails.ts";
import {useTranslation} from "react-i18next";
import {getBinanceIndexAssetRecomBestPreviousDetail} from "../../utils/api/GraphsService.ts";
import {TitleHeader} from "../../components/about/TitleHeader.tsx";
import {RecommendationDetailsSkeleton} from "../../components/graphs/RecommendationDetailsSkeleton.tsx";
import {RecommendedSeasonSelect} from "../../components/graphs/RecommendedSeasonSelect.tsx";
import {RecommendationDetailSeasonEnum} from "../../utils/enums/RecommendationDetailSeasonEnum.ts";
import {RecommendationDetailWeekDetails} from "../../components/graphs/RecommendationDetailWeekDetails.tsx";
import {RecommendationDetailsMonthDetails} from "../../components/graphs/RecommendationDetailsMonthDetails.tsx";
import {RecommendationDetailsQuarterDetails} from "../../components/graphs/RecommendationDetailsQuarterDetails.tsx";
import {RecommendationDetailsYearDetails} from "../../components/graphs/RecommendationDetailsYearDetails.tsx";
import {RecommendationDetailsBuy} from "../../components/graphs/RecommendationDetailsBuy.tsx";
import {RecommendationDetailsSell} from "../../components/graphs/RecommendationDetailsSell.tsx";
import {RecommendationProfitGraph} from "../../components/graphs/RecommendationProfitGraph.tsx";
import {RecommendedDetailsPriceGraph} from "../../components/graphs/RecommendedDetailsPriceGraph.tsx";
import {RecommendedDetailsPriceGraph1} from "../../components/graphs/RecommendedDetailsPriceGraph_new.tsx";
import {CardContainer} from "../../components/reusable/CardContainer.tsx";
import {BtfdDcaComparison} from "../../components/graphs/BtfdDcaComparison.tsx";

/*
*  URL: https://serious.broker/graphs/recommendation/detail/BTC
*  login -> pairs -> search asset or select from the table
* */

export enum Day {
    Sunday = 1,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
}


export const RecommendationDetails_new:FC = () => {
    const {t} = useTranslation();
    const {asset_label} = useParams<{ asset_label: string }>();
    const [detailsData, setDetailsData] = useState<BinanceIndexAssetRecomBestPreviousDetails | undefined>();
    const [selectedPeriod, setSelectedPeriod] = useState<RecommendationDetailSeasonEnum>(RecommendationDetailSeasonEnum.Week);
    const [selectedDropdown, setSelectedDropdown] = useState<string>("buy");
    const [selectedTimeZone, setSelectedTimeZone] = useState<string>("UTC");

    useEffect(() => {
        if (!asset_label) return;
        const getData = async () => {
            try {
                const res = await getBinanceIndexAssetRecomBestPreviousDetail(asset_label);
                setDetailsData(res.data);
            } catch (e) {
                console.error("Failed to fetch recommendation details:", e);
                setDetailsData(undefined);
            }
        };
        getData();
    }, [asset_label]);

    // @ts-ignore
    return (
        <>
            {detailsData ? (
                <>
                    <TitleHeader title={`${detailsData.name}`} title2={`${detailsData.asset_label}`} />
                    <div className="container graph-container mt-4">
                        <div className="service-details__wrapper">
                            <div className="service-details__item">
                                <div className="service-details__item-inner mb-5">
                                    {/*
                                    <h5 className="index-title" style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{t("Quote currencies: ")}{detailsData.quote_currencies}</h5>
                                    {detailsData.all_pos !== null && <p>{t("Best of all index: ")}{detailsData.all_pos}</p>}
                                    {detailsData.all_sug !== null && <p>{t("All suggestions: ")}{detailsData.all_sug}</p>}
                                    {detailsData.cmc_rank !== null && <p>{t("cmc_rank")}: {detailsData.cmc_rank}</p>}

                                    <RecommendedSeasonSelect selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />

                                    {/* Based on selected period react component is chosen
                                        only for displaying stats and information next to graph }

                                    <div className="row">
                                        <div className="col-sm-5">
                                            {selectedPeriod === RecommendationDetailSeasonEnum.Week ? (
                                                <RecommendationDetailWeekDetails detailsData={detailsData}/>
                                            ) : selectedPeriod === RecommendationDetailSeasonEnum.Month ? (
                                                <RecommendationDetailsMonthDetails detailsData={detailsData}/>
                                            ) : selectedPeriod === RecommendationDetailSeasonEnum.Quarter ? (
                                                <RecommendationDetailsQuarterDetails detailsData={detailsData}/>
                                            ) : selectedPeriod === RecommendationDetailSeasonEnum.Year ? (
                                                <RecommendationDetailsYearDetails detailsData={detailsData}/>
                                            ) : null}
                                        </div>

                                        {/* Firsth graph component }

                                        <div className="col-sm">
                                            {asset_label && <RecommendationProfitGraph asset_label={asset_label} selectedPeriod={selectedPeriod} selectedTimeZone={selectedTimeZone} />}
                                        </div>
                                        <div className="mb-5">
                                            <i className="mb-2">{t("Ranking description")}</i>
                                            <i>{t("Invest description")}</i>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center mt-4 mb-2" style={{maxWidth: "250px"}}>
                                        <label className="form-label me-2">{t("Recommendation for")}</label>
                                        <select
                                            className="form-select mb-2"
                                            value={selectedDropdown}
                                            onChange={(e) => setSelectedDropdown(e.target.value)}
                                        >
                                            <option value="buy">{t("When to buy")}</option>
                                            <option value="sell">{t("When to sell")}</option>
                                        </select>
                                    </div>

                                    {/* Recommendation stats and data }

                                    <div className="row">
                                    {selectedDropdown === "buy" && <RecommendationDetailsBuy detailsData={detailsData} selectedTimeZone={selectedTimeZone} />}
                                    {selectedDropdown === "sell" && <RecommendationDetailsSell detailsData={detailsData} selectedTimeZone={selectedTimeZone} />}
                                    </div>*/}



                                    <h1 className="index-title" style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{t("Latest Weekly Recommendations")}</h1>

                                    <CardContainer color="#ffffff20" >
                                        <div className="row justify-content-center text-center align-items-center" style={{paddingTop: "1.5em"}}>
                                            <div className="col" style={{fontWeight: "bold", fontSize: "2.8rem"}}>{detailsData.buy_week_0_week_day != null ? Day[detailsData.buy_week_0_week_day] : detailsData.buy_week_0_week_day} {detailsData.buy_week_0_hour}:00</div>
                                            <div className="col" style={{fontWeight: "bold", fontSize: "2.8rem"}}>{detailsData.sell_week_0_week_day != null ? Day[detailsData.sell_week_0_week_day] : detailsData.sell_week_0_week_day} {detailsData.sell_week_0_hour}:00</div>
                                        </div>
                                        <div className="row justify-content-center text-center align-items-center" style={{paddingBottom: "1.5em"}}>
                                            <div className="col" style={{fontSize: "1.4rem", color: "#C3C0BB"}}>Best time to buy</div>
                                            <div className="col" style={{fontSize: "1.4rem", color: "#C3C0BB"}}>Best time to sell</div>
                                        </div>
                                    </CardContainer>



                                    {/* Recommendation graph */}

                                    {asset_label && <RecommendedDetailsPriceGraph1 asset_label={asset_label} selectedTimeZone={selectedTimeZone} setSelectedTimezone={setSelectedTimeZone}/>}
                                    {asset_label && <BtfdDcaComparison asset_label={asset_label}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : <RecommendationDetailsSkeleton/>}
        </>
    );
};