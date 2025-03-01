import axios from "axios";
import {backendUrl} from "../../env.ts";
import {AssetOrder} from "../enums/AssetOrderEnum.ts";
import {AssetType} from "../types/asset/AssetType.ts";
import {ChartAssetBuyEnum} from "../enums/ChartAssetBuyEnum.ts";
import {QuotedCurrency} from "../types/graphs/QuotedCurrency.ts";
import {QuotedCurrenciesPeriod} from "../options/QuotedCurrenciesPeriod.ts";

export const getAllAssets = async (page: number, limit: number, orderType: AssetOrder) => {
    const token = localStorage.getItem("token");
    if(!token) return;
    
    const response = axios.get<{totalPages: number; data: AssetType[]}>(backendUrl + "graphs/binance_index_assets/get_all_assets.php", {
        params: {
            page: page,
            limit: limit,
            order: orderType
        },
        headers:{
            Authorization2: `Bearer ${token}`,
                'Content-Type': 'application/json'
        },
    });
    return await response;
};


export const getAssetByIndexLabel = async (index_label: string) => {
    const token = localStorage.getItem("token");
    if(!token) return;
    
    const response = axios.get( backendUrl + "graphs/binance_index_assets/get_asset_by_id.php", {
        params: {
            name: index_label
        },
        headers: {
            Authorization2: `Bearer ${token}`
        }
    });
    return await response;
};

export const getAssetByIdGraphData = async (asset_id: number) => {
    const token = localStorage.getItem("token");
    if(!token) return;
    
    const response = axios.get(backendUrl + "graphs/binance_index_assets/get_asset_by_id_graph_data.php", {
        params: {
            asset_id: asset_id
        },
        headers: {
            Authorization2: `Bearer ${token}`
        }
    });
    return await response;
};

export const getAssetBuysBetween = async (asset_id: number, time_from: string, time_to: string) => {
    const token = localStorage.getItem("token");
    if(!token) return;
    
    return await axios.get(backendUrl + "graphs/binance_index_assets/binance_index_assets_buy_between.php", {
        params: {
            asset_id: asset_id,
            time_from: time_from.toString(),
            time_to: time_to.toString()
        },
        headers: {
            Authorization2: `Bearer ${token}`,
            'Content-Type':
                'application/json',
        }
    });
}

export const getMostProfitableAssets = async (page: number, limit: number) => {
    const token = localStorage.getItem("token");
    if(!token) return;
    
    const response = axios.get(backendUrl + "/graphs/binance_index_assets/get_most_profitable_assets.php", {
        params: {
            page: page,
            limit: limit
        },
        headers:{
            Authorization2: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });
    return await response;
};

export const getAssetBuys = async (asset_id: number, period: ChartAssetBuyEnum) => {
    const token = localStorage.getItem("token");
    if(!token) return;
    
    if (period === ChartAssetBuyEnum.Week) {
        const response = axios.get(backendUrl + "graphs/binance_index_assets/earning_in/binance_index_assets_buy_week.php", {
            params: {
                asset_id: asset_id
            },
            headers: {
                Authorization2: `Bearer ${token}`,
                'Content-Type':
                    'application/json',
            }
        });
        return await response;
    }
}

export const getAssetGraphData = async (currencies: QuotedCurrency[], period: QuotedCurrenciesPeriod) => {
    const token = localStorage.getItem("token");
    if(!token) return;
    
    return await axios.post(backendUrl + "graphs/binance_index_assets/asset_graph_data.php", {
        currencies: currencies,
        period: period
    }, {
        headers: {
            Authorization2: `Bearer ${token}`
        }
    });
}