import axios from "axios";
import {backendUrl} from "../../env.ts";
import {AssetOrder} from "../enums/AssetOrderEnum.ts";
import {AssetType} from "../types/asset/AssetType.ts";
import {QuotedCurrency} from "../types/graphs/QuotedCurrency.ts";
import {QuotedCurrenciesPeriod} from "../options/QuotedCurrenciesPeriod.ts";
import {AssetGraphPriceDetailsType} from "../types/graphs/AssetGraphPriceDetailsType.ts";

export const getAllAssets = async (page: number, limit: number, orderType: AssetOrder) => {
    const token = localStorage.getItem("token");
    if(!token) return;
    
    return await axios.get<{totalPages: number; data: AssetType[]}>(backendUrl + "graphs/binance_index_assets/get_all_assets.php", {
        params: {
            page: page,
            limit: limit,
            order: orderType
        },
        headers:{
            Authorization: `Bearer ${token}`
        },
    });
};


export const getAssetByIndexLabel = async (index_label: string) => {
    const token = localStorage.getItem("token");
    if(!token) return;
    
    return await axios.get( backendUrl + "graphs/binance_index_assets/get_asset_by_id.php", {
        params: {
            name: index_label
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const getAssetByIdGraphData = async (asset_id: number) => {
    const token = localStorage.getItem("token");
    if(!token) return;
    
    return await axios.get(backendUrl + "graphs/binance_index_assets/get_asset_by_id_graph_data.php", {
        params: {
            asset_id: asset_id
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const getAssetGraphData = async (currencies: QuotedCurrency[], period: QuotedCurrenciesPeriod) => {
    const token = localStorage.getItem("token");
    if(!token) return;
    
    return await axios.get(backendUrl + "graphs/binance_index_assets/asset_graph_data.php", {
        params: {
            currencies: JSON.stringify(currencies),
            period: period
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getAssetGraphPriceDetails = async (name: string) => {
    const token = localStorage.getItem("token");
    if(!token) return;
    
    return await axios.get<AssetGraphPriceDetailsType>(backendUrl + "graphs/binance_index_assets/get_asset_details.php", {
        params: {
            name: name
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}