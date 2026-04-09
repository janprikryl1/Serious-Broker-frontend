import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {BinanceIndexAssetRecomBestPreviousDetails} from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousDetails.ts";
import {useTranslation} from "react-i18next";
import {getBinanceIndexAssetRecomBestPreviousDetail} from "../../utils/api/GraphsService.ts";
import {TitleHeader} from "../../components/about/TitleHeader.tsx";
import {RecommendationDetailsSkeleton} from "../../components/graphs/RecommendationDetailsSkeleton.tsx";
import {RecommendationDetailSeasonEnum} from "../../utils/enums/RecommendationDetailSeasonEnum.ts";
import {RecommendedDetailsPriceGraph1} from "../../components/graphs/RecommendedDetailsPriceGraph_new.tsx";
import {CardContainer} from "../../components/reusable/CardContainer.tsx";
import {BtfdDcaComparison} from "../../components/graphs/BtfdDcaComparison.tsx";
import {OutlineContainer} from "../../components/reusable/OutlineContainer.tsx";
import {getCryptocurrencyById} from "../../utils/api/CryptocurrencyService.ts";
import {coinURL} from "../../utils/constants";
import {CryptoCurrencyDetailType} from "../../utils/types/asset/CryptoCurrencyType.ts";

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
    const [cryptoDetails, setCryptoDetails] = useState<CryptoCurrencyDetailType | undefined>();
    const [selectedPeriod, setSelectedPeriod] = useState<RecommendationDetailSeasonEnum>(RecommendationDetailSeasonEnum.Week);
    const [selectedDropdown, setSelectedDropdown] = useState<string>("buy");
    const [selectedTimeZone, setSelectedTimeZone] = useState<string>("UTC");

    useEffect(() => {
        if (!asset_label) return;
        const getData = async () => {
            try {
                const res = await getBinanceIndexAssetRecomBestPreviousDetail(asset_label);
                setDetailsData(res.data);
                const cryptoRes = await getCryptocurrencyById(asset_label);
                setCryptoDetails(cryptoRes.data);
            } catch (e) {
                console.error("Failed to fetch recommendation details:", e);
                setDetailsData(undefined);
            }
        };
        getData();
    }, [asset_label]);

    return (
        <>
            {detailsData ? (
                <>
                    <TitleHeader
                        title={`${detailsData.name}`}
                        title2={`${detailsData.asset_label}`}
                        img={cryptoDetails?.stylized_image ? `${coinURL}/${cryptoDetails.stylized_image}` : ""}
                    />
                    <div className="container graph-container mt-4">
                        <div className="service-details__wrapper">
                            <div className="service-details__item">
                                <div className="service-details__item-inner mb-5">
                                    <h1 className="index-title" style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{t("Latest Weekly Recommendations")}</h1>

                                    <OutlineContainer bgColor={"var(--quaternary-color-transparent-50)"}>
                                        <div className="row justify-content-center text-center align-items-center" style={{paddingTop: "1.5em"}}>
                                            <div className="col" style={{fontWeight: "bold", fontSize: "2.8rem"}}>{detailsData.buy_week_0_week_day != null ? t(Day[detailsData.buy_week_0_week_day]) : detailsData.buy_week_0_week_day} {detailsData.buy_week_0_hour}:00</div>
                                            <div className="col" style={{fontWeight: "bold", fontSize: "2.8rem"}}>{detailsData.sell_week_0_week_day != null ? t(Day[detailsData.sell_week_0_week_day]) : detailsData.sell_week_0_week_day} {detailsData.sell_week_0_hour}:00</div>
                                        </div>
                                        <div className="row justify-content-center text-center align-items-center" style={{paddingBottom: "1.5em"}}>
                                            <div className="col" style={{fontSize: "1.4rem", color: "#C3C0BB"}}>{t("Best time to buy")}</div>
                                            <div className="col" style={{fontSize: "1.4rem", color: "#C3C0BB"}}>{t("Best time to sell")}</div>
                                        </div>
                                    </OutlineContainer>

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