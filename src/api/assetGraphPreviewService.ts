import axios from "axios";
import {backendUrl} from "../env.ts";

export const getAssetGraphPreviewDate = async (coin: string) => {
    return await axios.get(`${backendUrl}graphs/binance_index_assets/get_asset_by_label_preview.php`, {
        params: {
            coin: coin
        }
    });
}