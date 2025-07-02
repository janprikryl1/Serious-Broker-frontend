import axios from "axios";
import {backendUrl} from "../../env.ts";

export const getAllAssetCoins = async () => {
    return await axios.get(`${backendUrl}index/all_coins.php`);
}

export const getAssetCoinDetails = async (coin: string, period: string, amount: number) => {
    return await axios.get(`${backendUrl}index/asset_details.php`, {
        params: {
            coin: coin,
            period: period,
            amount: amount
        }
    });
}

export const bestAssetDetails = async (index: number) => {
    return await axios.get(`${backendUrl}index/best_asset_detail.php`, {
        params: {
            index: index
        }
    });
}