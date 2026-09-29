import {FC} from "react";
import { useTranslation } from "react-i18next";
import {FaBookmark, FaRegBookmark} from "react-icons/fa";
import {TitleHeader} from "../../../components/about/TitleHeader.tsx";
import {AssetGraphCurrencyDetailTextItem} from "../../../components/graphs/asset/AssetGraphCurrencyDetailTextItem.tsx";
import {Button} from "../../../components/reusable/Button.tsx";
import {CoinGraph} from "../../../components/demo/demoWidgets/CoinGraph.tsx";
import {EarningIn} from "../../../components/graphs/earningIn/EarningIn.tsx";
import {AssetGraphCurrencyDetailSkeleton} from "../../../components/graphs/asset/AssetGraphCurrencyDetailSkeleton.tsx";
import {toCzechDateFormat} from "../../../utils/functions/dateFunctions.ts";
import {useAssetGraphCurrencyDetailDate} from "../../../utils/hooks/useAssetGraphCurrencyDetailDate.ts";
import {AssetGraphWhereToFindCurrency} from "../../../components/graphs/earningIn/AssetGraphWhereToFindCurrency.tsx";

export const AssetGraphCurrencyDetail: FC = () => {
    const { t } = useTranslation();
    const {
        asset,
        handleAddToWatchList,
        handleRemoveFromWatchList,
        setStartDate,
        startDate,
        setEndDate,
        endDate,
        setSeries,
        series
    } = useAssetGraphCurrencyDetailDate();
    
    return (
        <>
            <TitleHeader title={t("GraphAssetData - details about asset and graph")} text={asset?.asset_label} />
            {asset ? (
                <div className="container justify-content-center mb-1 mt-4">
                    <div className="service-details__wrapper">
                        <div className="service-details__item">
                            <div className="service-details__item-inner">
                                <div data-aos="fade-up" data-aos-duration="1000" className="text-center">
                                    <AssetGraphCurrencyDetailTextItem 
                                        text={<h1>{t("GraphAssetData - details about asset and graph")}</h1>} 
                                        marginBottom="20px"
                                        fontSize="80px"
                                    />
                                    <Button className="mb-3">
                                        {!asset.in_watchlist ? 
                                            <FaRegBookmark onClick={handleAddToWatchList}/> : 
                                            <FaBookmark onClick={handleRemoveFromWatchList} />
                                        }
                                    </Button>
                                    <AssetGraphCurrencyDetailTextItem 
                                        text={<span>{t("Currency: ")} <strong>{asset.asset_label}</strong></span>}
                                    />
                                    <AssetGraphCurrencyDetailTextItem 
                                        text={<span>{t("Allocation: ")} <strong>{asset.allocation * 100}%</strong></span>}
                                    />
                                    <AssetGraphCurrencyDetailTextItem
                                        text={<span>{t("Changed")}: <strong>{toCzechDateFormat(asset.changed!)}</strong></span>}
                                    />
                                    <AssetGraphCurrencyDetailTextItem 
                                        text={<span>{t("Created")}: <strong>{toCzechDateFormat(asset.created!)}</strong></span>} 
                                        marginBottom="40px" 
                                    />
                                    <CoinGraph
                                        asset_label={asset.asset_label}
                                        series={series}
                                        setStartDate={setStartDate}
                                        startDate={startDate}
                                        setSeries={setSeries}
                                        endDate={endDate}
                                        setEndDate={setEndDate}
                                    />
                                    {series !== undefined && 
                                        <EarningIn series={series} startDate={startDate} endDate={endDate}/>
                                    }
                                    <AssetGraphWhereToFindCurrency />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <AssetGraphCurrencyDetailSkeleton />}
        </>
    );
};
