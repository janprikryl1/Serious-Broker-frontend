/*import axios from "axios";
import {assetGraphsAPI} from "../utils/constants";
import {AssetType} from "../utils/types/asset/AssetType";

export const getAllAssets = async () => {
    const response = axios.get<AssetType[]>(assetGraphsAPI);
    return await response;
};


export const getAssetById = async (id: number) => {
    const response = axios.get( "/api/binance_index_assets_buys/" + id);
    return await response;
};

export const getAssetBuysBetween = async (asset_id: number, time_from: string, time_to: string) => {
    return await axios.get(`/api/binance_index_assets_buy_between/`, {
        params: {
            asset_id: asset_id,
            time_from: time_from.toString(),
            time_to: time_to.toString()
        }
    });
}

export const getMostProfitableAssets = async () => {
    const response = axios.get("/api/binance_indexes");
    return await response;
};
*/