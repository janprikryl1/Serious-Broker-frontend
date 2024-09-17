import axios from "axios";
import {backendUrl} from "../env.ts";
import {BinanceIndexAssetRecomBestPreviousType} from "../utils/types/graphs/BinanceIndexAssetRecomBestPreviousType.ts";
import {
    BinanceIndexAssetRecomBestPreviousDetails
} from "../utils/types/graphs/BinanceIndexAssetRecomBestPreviousDetails.ts";

export const getBinanceIndexAssetRecomBestPrevious = async (orderBy: string) => {
    const res  = axios.get<BinanceIndexAssetRecomBestPreviousType[]>(backendUrl + "graphs/binance_index_asset_recom_best_previous.php", {
        params: {
            order_by: orderBy
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