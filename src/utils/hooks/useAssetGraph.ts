import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {AssetDetailType} from "../types/asset/AssetDetailType.ts";
import {QuotedCurrenciesPeriod} from "../options/QuotedCurrenciesPeriod.ts";
import {Currencies} from "../enums/CurrenciesEnum.ts";
import {AssetAnalysisGraphData} from "../types/graphs/AssetAnalysisGraphData.ts";
import {getAssetByIndexLabel, getAssetGraphDataPreparedAssets} from "../api/binanceIndexAssets.ts";
import {addToWatchList, removeFromWatchList} from "../api/watchListService.ts";
import {WatchListEnum} from "../enums/WatchListEnum.ts";
import {formatCurrency} from "../functions/functions.ts";
import {MissingCurrencyType} from "../types/graphs/MissingCurrencyType.ts";

export const useAssetGraph = (propName?: string) => {
    const { name } = useParams();
    const assetName = propName || name;
    const [asset, setAsset] = useState<AssetDetailType | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState(QuotedCurrenciesPeriod.month);
    const [currency, setCurrency] = useState<Currencies>(Currencies.EUR);
    const [currencyPrice, setCurrencyPrice] = useState<string>();
    const [currencyValue, setCurrencyValue] = useState<number>(1);
    const [graphData, setGraphData] = useState<AssetAnalysisGraphData>();
    const [missingCurrencies, setMissingCurrencies] = useState<MissingCurrencyType[]>();
    const [isInWatchList, setIsInWatchList] = useState<boolean>(false);

    useEffect(() => {
        if (!assetName) return;
        const getGraphData = async () => {
            const response = await getAssetByIndexLabel(assetName);
            if (!response) return;
            setAsset(response.data);
        };
        getGraphData();
    }, [assetName]);

    const handleToggleWatchList = async () => {
        if (!asset) return;
        if (asset.in_watchlist) {
            try {
                const response = await removeFromWatchList(asset.id);
                if (response?.status === 200) {
                    setAsset({...asset, in_watchlist: false});
                }
            } catch (e) {
                console.error(e);
            }
        } else {
            const response = await addToWatchList(asset.id, WatchListEnum.Asset);
            if (response?.status === 200) {
                setAsset({...asset, in_watchlist: true});
            }
        }
    };

    useEffect(() => {
        if (!asset || !assetName) return;
        const getGraphData = async () => {
            try {
                setGraphData(undefined);
                const response = await getAssetGraphDataPreparedAssets(assetName, selectedPeriod);
                if (!response) return;
                setGraphData(response.data);
                setCurrencyPrice(formatCurrency(response.data.price));
                setCurrency(Currencies.EUR);
                if ("missing_assets" in response.data) {
                    setMissingCurrencies(response.data.missing_assets as MissingCurrencyType[]);
                }
                if ("in_watchlist" in response.data) {
                    setIsInWatchList(response.data.in_watchlist);
                }
            } catch (e) {
                console.error(e);
            }
        };
        getGraphData();
    }, [selectedPeriod, asset]);
    
    return {
        asset,
        handleToggleWatchList,
        selectedPeriod,
        setSelectedPeriod,
        currencyValue,
        setCurrencyValue,
        setCurrency,
        setCurrencyPrice,
        currencyPrice,
        currency,
        graphData,
        missingCurrencies,
        isInWatchList
    }
}