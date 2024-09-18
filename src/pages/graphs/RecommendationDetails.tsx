import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {TitleHeader} from "../../components/modules/about/TitleHeader.tsx";
import {getBinanceIndexAssetRecomBestPreviousDetail} from "../../api/GraphsService.ts";
import {BinanceIndexAssetRecomBestPreviousDetails} from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousDetails.ts";
import {useTranslation} from "react-i18next";
import {RecommendationDetailsSkeleton} from "../../components/modules/graphs/RecommendationDetailsSkeleton.tsx";

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
                    <p>{t("Month suggestion: ")}{detailsData.month_sug}</p>
                    <p>{t("Week all: ")}{detailsData.month_all}</p>
                    <p>{t("Month all profit: ")}{detailsData.month_all_profit}</p>
                    <p>{t("Positions in month 0: ")}{detailsData.month_0_pos}</p>
                    <p>{t("Month 0 profit: ")}{detailsData.month_0_profit}</p>
                    <p>{t("Positions in month 1: ")}{detailsData.month_1_pos}</p>
                    <p>{t("Month 1 profit: ")}{detailsData.month_1_profit}</p>
                    <p>{t("Positions in month 2: ")}{detailsData.month_2_pos}</p>
                    <p>{t("Month 2 profit: ")}{detailsData.month_2_profit}</p>
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
                    <p>{t("Year suggestion: ")}{detailsData.year_sug}</p>
                    <p>{t("Year all: ")}{detailsData.year_all}</p>
                    <p>{t("Year all profit: ")}{detailsData.year_all_profit}</p>
                    <p>{t("Positions in year 0: ")}{detailsData.year_0_pos}</p>
                    <p>{t("Year 0 profit: ")}{detailsData.year_0_profit}</p>
                    <p>{t("Positions in year 1: ")}{detailsData.year_1_pos}</p>
                    <p>{t("Year 1 profit: ")}{detailsData.year_1_profit}</p>
                    <p>{t("Positions in year 2: ")}{detailsData.year_2_pos}</p>
                    <p>{t("Year 2 profit: ")}{detailsData.year_2_profit}</p>
                    <p>{t("Week 0 week day: ")}{detailsData.week_0_week_day}</p>
                    <p>{t("Week 0 hour: ")}{detailsData.week_0_hour}</p>
                    <p>{t("Week 1 week day: ")}{detailsData.week_1_week_day}</p>
                    <p>{t("Week 1 hour: ")}{detailsData.week_1_hour}</p>
                    <p>{t("Week 2 week day: ")}{detailsData.week_2_week_day}</p>
                    <p>{t("Week 2 hour: ")}{detailsData.weekr_2_hour}</p>
                    <p>{t("Week 3 week day: ")}{detailsData.week_3_week_day}</p>
                    <p>{t("Week 3 hour: ")}{detailsData.week_3_hour}</p>
                    <p>{t("Month 0 week day: ")}{detailsData.month_0_week_day}</p>
                    <p>{t("Month 0 hour: ")}{detailsData.month_0_hour}</p>
                    <p>{t("Month 1 week day: ")}{detailsData.month_1_week_day}</p>
                    <p>{t("Month 1 hour: ")}{detailsData.month_1_hour}</p>
                    <p>{t("Month 2 week day: ")}{detailsData.month_2_week_day}</p>
                    <p>{t("Month 2 hour: ")}{detailsData.month_2_hour}</p>
                    <p>{t("Quarter 0 week day: ")}{detailsData.quarter_0_week_day}</p>
                    <p>{t("Quarter 0 hour: ")}{detailsData.quarter_0_hour}</p>
                    <p>{t("Quarter 1 week day: ")}{detailsData.quarter_1_week_day}</p>
                    <p>{t("Quarter 1 hour: ")}{detailsData.quarter_1_hour}</p>
                    <p>{t("Quarter 2 week day: ")}{detailsData.quarter_2_week_day}</p>
                    <p>{t("Quarter 2 hour: ")}{detailsData.quarter_2_hour}</p>
                    <p>{t("Quarter 3 week day: ")}{detailsData.quarter_3_week_day}</p>
                    <p>{t("Quarter 3 hour: ")}{detailsData.quarter_3_hour}</p>
                    <p>{t("Year 0 week day: ")}{detailsData.year_0_week_day}</p>
                    <p>{t("Year 0 hour: ")}{detailsData.year_0_hour}</p>
                    <p>{t("Year 1 week day: ")}{detailsData.year_1_week_day}</p>
                    <p>{t("Year 1 hour: ")}{detailsData.year_1_hour}</p>
                    <p>{t("Year 2 week day: ")}{detailsData.year_2_week_day}</p>
                    <p>{t("Year 2 hour: ")}{detailsData.year_2_hour}</p>
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