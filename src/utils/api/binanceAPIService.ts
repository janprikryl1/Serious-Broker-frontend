import axios from "axios";
import {KlineData} from "../types/KlineData.ts";
import {backendUrl} from "../../env.ts";

export const getBinanceAssetGraphData = async (coin: string, interval: string, startTime: number, endTime: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    const response = await axios.get<KlineData[]>(`${backendUrl}binance/get_asset_data.php`, {
        params: {
            symbol: coin,
            interval: interval,
            startTime: startTime,
            endTime: endTime,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
};
