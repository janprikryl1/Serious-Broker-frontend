import { api } from "./axiosInstance.ts";

export const getAssetGraphPreviewDate = async (coin: string) => {
    return await api.get(`graphs/binance_index_assets/get_asset_by_label_preview.php`, {
        params: {
            coin: coin
        }
    });
}