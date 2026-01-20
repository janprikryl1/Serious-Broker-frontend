import axios from "axios";
import {BinanceIndexAssetRecomBestPreviousType} from "../types/graphs/BinanceIndexAssetRecomBestPreviousType.ts";
import {backendUrl} from "../../env.ts";
import {BinanceIndexAssetRecomBestPreviousDetails} from "../types/graphs/BinanceIndexAssetRecomBestPreviousDetails.ts";
import {RecommendationDetailSeasonEnum} from "../enums/RecommendationDetailSeasonEnum.ts";

export const getBinanceIndexAssetRecomBestPrevious = async (orderBy: string, page: number, sortDirection: "asc" | "desc", filters: { includeCurrencies: string[]; searchQuery: string }) => {
    const res  = axios.get<{totalPages: number; data: BinanceIndexAssetRecomBestPreviousType[]}>(backendUrl + "graphs/binance_index_asset_recom_best_previous.php", {
        params: {
            order_by: orderBy,
            page: page,
            sortDirection: sortDirection,
            includeCurrencies: filters.includeCurrencies.join(","),
            searchQuery: filters.searchQuery
        }
    });
    return await res;
}

export const getBinanceIndexAssetRecomBestPreviousDetail = async (assetLabel: string) => {
    const res = axios.get<BinanceIndexAssetRecomBestPreviousDetails>(backendUrl + "graphs/binance_index_asset_recom_best_previous_detail.php", {
        params: {
            asset_label: assetLabel
        }
    });
    return await res;
}

export const getBinanceIndexAssetRecomBestPreviousGraphData = async (assetLabel: string, selectedPeriod: RecommendationDetailSeasonEnum) => {
    return await axios.get(`${backendUrl}graphs/binance_index_asset_recom_best_graph_data.php`, {
        params: {
            asset_label: assetLabel,
            selected_period: selectedPeriod
        }
    })
}

export const getBinanceIndexAssetPriceGraphData = async (assetLabel: string, selectedPeriod: RecommendationDetailSeasonEnum) => {
    return await axios.get(`${backendUrl}graphs/binance_index_asset_recom_best_graph_price_data.php`, {
        params: {
            asset_label: assetLabel,
            selected_period: selectedPeriod
        }
    })
}

/* Used in RecommendedDetailsPriceGraph_new */
export const getBinanceIndexAssetAverageGraphData = async (assetLabel: string, numberOfWeeks: number) => {
    return await axios.get(`${backendUrl}graphs/binance_index_assets/get_average_asset_buy_hourly.php`, {
        params: {
            asset_label: assetLabel,
            number_of_weeks: numberOfWeeks
        }
    })
}

/* Used in BtfdDcaComparison */
export const getAssetSpotKlines = async (assetLabel: string, numberOfYears: number, endDate?: string) => {
    return await axios.get(`${backendUrl}graphs/asset_klines.php`, {
        params: {
            asset_label: assetLabel,
            num_of_years: numberOfYears,
            endDate: endDate
        }
    })
}