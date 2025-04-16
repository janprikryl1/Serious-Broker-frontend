import {FC, useEffect, useMemo, useState} from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Assets } from "../../utils/types/asset/AssetDetailType.ts";
import {FaBookmark, FaRegBookmark} from "react-icons/fa";
import {WatchListEnum} from "../../utils/enums/WatchListEnum.ts";
import {getAssetByIdGraphData} from "../../utils/api/binanceIndexAssets.ts";
import {addToWatchList, removeFromWatchList} from "../../utils/api/watchListService.ts";
import {TitleHeader} from "../../components/about/TitleHeader.tsx";
import {AssetGraphCurrencyDetailTextItem} from "../../components/graphs/asset/AssetGraphCurrencyDetailTextItem.tsx";
import {Button} from "../../components/reusable/Button.tsx";
import {CoinGraph} from "../../components/demo/demoWidgets/CoinGraph.tsx";
import {EarningIn} from "../../components/graphs/earningIn/EarningIn.tsx";
import {AssetGraphCurrencyDetailSkeleton} from "../../components/graphs/asset/AssetGraphCurrencyDetailSkeleton.tsx";
import {toCzechDateFormat} from "../../utils/functions/dateFunctions.ts";
import {CandlestickData} from "../../utils/types/asset/KlineData.ts";

export const AssetGraphCurrencyDetail: FC = () => {
    const { t } = useTranslation();
    const { index_label } = useParams();
    const [asset, setAsset] = useState<Assets>();
    const today = useMemo(() => new Date(), []);
    const oneYearAgo = useMemo(() => new Date(new Date().setFullYear(today.getFullYear() - 1)), [today]);
    const [startDate, setStartDate] = useState<string>(oneYearAgo.toISOString().split("T")[0]);
    const [endDate, setEndDate] = useState<string>(today.toISOString().split("T")[0]);
    const [series, setSeries] = useState<{ data: CandlestickData[] }[]>();

    useEffect(() => {
        const getGraphData = async () => {
            if (index_label === undefined) return;
            const response = await getAssetByIdGraphData(parseInt(index_label));
            if (!response) return;
            setAsset(response.data.asset);
        };
        getGraphData();
    }, [index_label]);
    
    const handleAddToWatchList = async () => {
        if (!asset) return;
        try {
            const response = await addToWatchList(asset.id, WatchListEnum.Coin);
            if (response?.status === 200) {
                setAsset({...asset, in_watchlist: true});
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    const handleRemoveFromWatchList = async () => {
        if (!asset) return;
        try {
            const response = await removeFromWatchList(asset.id);
            if (response?.status === 200) {
                setAsset({...asset, in_watchlist: false});
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <TitleHeader title={t("GraphAssetData - details about asset and graph")} text={asset?.asset_label} />
            {asset ? (
                <div className="container justify-content-center mb-1">
                    <div className="service-details__wrapper">
                        <div className="service-details__item">
                            <div className="service-details__item-inner">
                                <div data-aos="fade-up" data-aos-duration="1000" className="text-center">
                                    <AssetGraphCurrencyDetailTextItem text={<h1>{t("GraphAssetData - details about asset and graph")}</h1>} marginBottom="20px" fontSize="80px" />
                                    <Button className="mb-3">{!asset.in_watchlist ? <FaRegBookmark onClick={handleAddToWatchList}/> : <FaBookmark onClick={handleRemoveFromWatchList} />}</Button>
                                    <AssetGraphCurrencyDetailTextItem text={<span>{t("Currency: ")} <strong>{asset.asset_label}</strong></span>} />
                                    <AssetGraphCurrencyDetailTextItem text={<span>{t("Allocation: ")} <strong>{asset.allocation * 100}%</strong></span>} />
                                    <AssetGraphCurrencyDetailTextItem text={<span>{t("Changed")}: <strong>{toCzechDateFormat(asset.changed!)}</strong></span>} />
                                    <AssetGraphCurrencyDetailTextItem text={<span>{t("Created")}: <strong>{toCzechDateFormat(asset.created!)}</strong></span>} marginBottom="40px" />
                                    <CoinGraph
                                        asset_label={asset.asset_label}
                                        series={series}
                                        setStartDate={setStartDate}
                                        startDate={startDate}
                                        setSeries={setSeries}
                                        endDate={endDate}
                                        setEndDate={setEndDate}
                                    />
                                    {series !== undefined && <EarningIn series={series} startDate={startDate} endDate={endDate}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <AssetGraphCurrencyDetailSkeleton />
            )}
        </>
    );
};
