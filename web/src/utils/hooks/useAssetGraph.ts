import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {AssetDetailType} from "../types/asset/AssetDetailType.ts";
import {QuotedCurrenciesPeriod} from "../options/QuotedCurrenciesPeriod.ts";
import {Currencies} from "../enums/CurrenciesEnum.ts";
import {AssetAnalysisGraphData} from "../types/graphs/AssetAnalysisGraphData.ts";
import {getAssetByIndexLabel, getAssetGraphDataPreparedAssets} from "../api/binanceIndexAssets.ts";
import {addToWatchList, removeFromWatchList} from "../api/watchListService.ts";
import {WatchListEnum} from "../enums/WatchListEnum.ts";
import {formatCurrency} from "../functions/functions.ts";
import {MissingCurrencyType} from "../types/graphs/MissingCurrencyType.ts";
import {useTranslation} from "react-i18next";
import {captureEvent} from "../posthog.ts";

export const useAssetGraph = (propName?: string) => {
    const { i18n } = useTranslation();
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
    const isWatchlistToggleRef = useRef(false);

    useEffect(() => {
        if (!assetName) return;
        const getGraphData = async () => {
            const response = await getAssetByIndexLabel(assetName);
            if (!response) return;
            setAsset(response.data);
            captureEvent('index_details_viewed', {
                index_name: assetName,
                label: response.data?.index_label,
            });
        };
        getGraphData();
    }, [assetName]);

    const handleToggleWatchList = async () => {
        if (!asset) return;

        isWatchlistToggleRef.current = true;

        const nextWatchState = !isInWatchList;
        setIsInWatchList(nextWatchState);
        setAsset({ ...asset, in_watchlist: nextWatchState });

        try {
            if (isInWatchList) {
                const response = await removeFromWatchList(asset.id);
                if (response?.status === 200) {
                    setAsset({...asset, in_watchlist: false});
                }
            } else {
                const response = await addToWatchList(asset.id, WatchListEnum.Asset);
                if (response?.status === 200) {
                    setAsset({...asset, in_watchlist: true});
                }
            }
        } catch (e) {
            console.error(e);
            setIsInWatchList(isInWatchList);
            setAsset({ ...asset, in_watchlist: isInWatchList });
        }
    };

    useEffect(() => {
        if (!assetName) return;

        if (isWatchlistToggleRef.current) {
            isWatchlistToggleRef.current = false;
            return;
        }

        const getGraphData = async () => {
            try {
                setGraphData(undefined);
                const response = await getAssetGraphDataPreparedAssets(assetName, selectedPeriod);
                if (!response) return;
                setGraphData(response.data);
                setCurrencyPrice(formatCurrency(response.data.price, i18n.language, Currencies.EUR));
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
    }, [selectedPeriod, assetName]);

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