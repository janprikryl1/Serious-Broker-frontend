import { api } from "./axiosInstance.ts";
import {AssetOrder} from "../enums/AssetOrder.ts";
import {AssetProfitList, AssetType} from "../types/asset/AssetType.ts";
import {AssetOrder as AssetOrderEnum} from "../enums/AssetOrderEnum.ts";
import {QuotedCurrency} from "../types/graphs/QuotedCurrency.ts";
import {QuotedCurrenciesPeriod} from "../options/QuotedCurrenciesPeriod.ts";
import {AssetGraphPriceDetailsType} from "../types/graphs/AssetGraphPriceDetailsType.ts";
import {RecommendedProfileAssetType} from "../types/asset/RecommendedProfileAssetType.ts";

// Table binance_index_asset
export const getAllAssets = async (page: number, limit: number, filters: { currencyCount: string; includeCurrencies: string[]; searchQuery: string; order: {direction: "asc" | "desc", orderType: AssetOrder, timeRange: string} }) => {

    return await api.get<{totalPages: number; data: AssetType[]}>("graphs/binance_index_assets/get_all_assets.php", {
        params: {
            page: page,
            limit: limit,
            currencyCount: filters.currencyCount,
            includeCurrencies: filters.includeCurrencies.join(","),
            search: filters.searchQuery,
            direction: filters.order.direction,
            order: filters.order.orderType,
            timeRange: filters.order.timeRange
        }
    });
};

export const getAllAssetsProfitList  = async (page: number, limit: number, orderType: AssetOrderEnum) => {
    const token = localStorage.getItem("token");
    if(!token) return;

    return await api.get<{totalPages: number; data: AssetProfitList[]}>("graphs/binance_index_assets/get_all_assets_profit_list.php", {
        params: {
            page: page,
            limit: limit,
            order: orderType
        }
    });
};

export const getAssetByIndexLabel = async (index_label: string) => {
    
    return await api.get("/graphs/binance_index_assets/get_asset_by_id.php", {
        params: {
            name: index_label
        }
    });
};

export const getAssetByIdGraphData = async (asset_id: number) => {
    return await api.get("graphs/binance_index_assets/get_asset_by_id_graph_data.php", {
        params: {
            asset_id: asset_id
        }
    });
};

export const getAssetGraphData = async (currencies: QuotedCurrency[], period: QuotedCurrenciesPeriod) => {
    const token = localStorage.getItem("token");
    if(!token) return;
    
    return await api.get("graphs/binance_index_assets/asset_graph_data.php", {
        params: {
            currencies: JSON.stringify(currencies),
            period: period
        }
    });
}

export const getAssetGraphDataPreparedAssets = async (asset_label: string, selectedPeriod: QuotedCurrenciesPeriod) => {

    return await api.get("graphs/binance_index_assets/asset_graph_data_prepared_asset.php", {
        params: {
            name: asset_label,
            period: selectedPeriod
        }
    });
}

export const getAssetGraphPriceDetails = async (name: string) => {
    const token = localStorage.getItem("token");
    if(!token) return;
    
    return await api.get<AssetGraphPriceDetailsType>("graphs/binance_index_assets/get_asset_details.php", {
        params: {
            name: name
        }
    });
}

export const getThreeLastAssetsGraphData = async () => {
    return await api.get<RecommendedProfileAssetType[]>("graphs/binance_index_assets/get_three_assets.php");
}

export const getWhereCoinInAsset = async (asset_id: string) => {
    return await api.get<{label: string, name: string}[]>("graphs/binance_index_assets/get_where_coin_in_asset.php", {
        params: {
            asset_id
        }
    });
}

export const getTradingCoins = async () => {
    return await api.get<string[]>("graphs/binance_index_assets/get_trading_coins.php");
}
