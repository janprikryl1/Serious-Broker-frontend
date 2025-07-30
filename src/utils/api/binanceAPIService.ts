import axios from "axios";
import {backendUrl} from "../../env.ts";
import {KlineData} from "../types/asset/KlineData.ts";

export const getBinanceAssetGraphData = async (coin: string, interval: string, startTime: number, endTime: number) => {
    const response = await axios.get<KlineData[]>(`${backendUrl}binance/get_asset_data.php`, {
        params: {
            symbol: coin,
            interval: interval,
            startTime: startTime,
            endTime: endTime,
        }
    });
    return response.data;
};
