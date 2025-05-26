import axios from "axios";
import {BinanceIndexAssetRecomBestPreviousType} from "../types/graphs/BinanceIndexAssetRecomBestPreviousType.ts";
import {backendUrl} from "../../env.ts";
import {BinanceIndexAssetRecomBestPreviousDetails} from "../types/graphs/BinanceIndexAssetRecomBestPreviousDetails.ts";

export const getBinanceIndexAssetRecomBestPrevious = async (orderBy: string, page: number) => {
    const res  = axios.get<{totalPages: number; data: BinanceIndexAssetRecomBestPreviousType[]}>(backendUrl + "graphs/binance_index_asset_recom_best_previous.php", {
        params: {
            order_by: orderBy,
            page: page
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

export const getBinanceIndexAssetRecomBestPreviousGraphData = async (assetLabel: string) => {
    return await axios.get(`${backendUrl}graphs/binance_index_asset_recom_best_graph_data.php`, {
        params: {
            asset_label: assetLabel
        }
    })
}