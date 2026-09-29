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

export const getAllHourlyBinanceKlinesData = async (symbol: string) => {
    // Ak coin neobsahuje USDT na konci, pridáme ho (napr. BTC -> BTCUSDT)
    const formattedSymbol = symbol.toUpperCase().endsWith("USDT")
      ? symbol.toUpperCase()
      : `${symbol.toUpperCase()}USDT`;

    const response = await axios.get<KlineData[]>(`${backendUrl}binance/get_asset_data.php`, {
        params: {
            symbol: formattedSymbol,
            interval: "1d",
            startTime: 0,
            endTime: Date.now(),
        }
    });

    return response.data;
};