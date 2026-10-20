import { api } from "./axiosInstance.ts";

export const getAllAssetCoins = async () => {
    return await api.get(`graphs/all_coins.php`);
}

export const getAssetCoinDetails = async (coin: string, period: string, amount: number) => {
    return await api.get(`index/asset_details.php`, {
        params: {
            coin: coin,
            period: period,
            amount: amount
        }
    });
}

export const bestAssetDetails = async (index: number) => {
    return await api.get(`index/best_asset_detail.php`, {
        params: {
            index: index
        }
    });
}