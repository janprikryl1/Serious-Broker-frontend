import {useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {Assets} from "../types/asset/AssetDetailType.ts";
import {CandlestickData} from "../types/asset/KlineData.ts";
import {getAssetByIdGraphData} from "../api/binanceIndexAssets.ts";
import {addToWatchList, removeFromWatchList} from "../api/watchListService.ts";
import {WatchListEnum} from "../enums/WatchListEnum.ts";

export const useAssetGraphCurrencyDetailDate = () => {
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
    
    return {
        asset,
        handleAddToWatchList,
        handleRemoveFromWatchList,
        setStartDate,
        startDate,
        setEndDate,
        endDate,
        setSeries,
        series
    }
}