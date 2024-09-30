import axios from "axios";
import {backendUrl} from "../env.ts";
import {LastCoinmarketCupCoinsType} from "../utils/types/indexPage/LastCoinmarketCupCoinsType.ts";
import {LastMostProfitableCoins} from "../utils/types/indexPage/LastMostProfitableCoins.ts";

export const getPopularCoins = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get<LastCoinmarketCupCoinsType[]>(backendUrl + "graphs/last_coinmarketcup_coins.php", {
        headers: {
            Authorization2: `Bearer ${token}`,
        }
    });
    return await res;
}

export const getLastMostProfitable = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get<LastMostProfitableCoins[]>(backendUrl + "graphs/last_most_profitable.php", {
        headers: {
            Authorization2: `Bearer ${token}`,
        }
    })
    return await res;
}