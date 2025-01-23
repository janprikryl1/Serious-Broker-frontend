import axios from "axios";
import {backendUrl} from "../env.ts";
import {LastCoinmarketCupCoinsType} from "../utils/types/indexPage/LastCoinmarketCupCoinsType.ts";
import {LastMostProfitableCoins} from "../utils/types/indexPage/LastMostProfitableCoins.ts";
import {AssetProfitData, IndexDataStructure} from "../utils/types/indexPage/IndexDataStructure.ts";
import {IndexSeason} from "../utils/enums/IndexSeasonEnum.ts";

export const getPopularCoins = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get<LastCoinmarketCupCoinsType[]>(backendUrl + "index/last_coinmarketcup_coins.php", {
        headers: {
            Authorization2: `Bearer ${token}`,
        }
    });
    return await res;
}

export const getLastMostProfitable = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get<LastMostProfitableCoins[]>(backendUrl + "index/last_most_profitable.php", {
        headers: {
            Authorization2: `Bearer ${token}`,
        }
    })
    return await res;
}

export const getIndexData = async () => {
    return  await axios.get<IndexDataStructure>(backendUrl + "index/index.php");
}

export const getMostProfitableSelectedPeriod = async (season: IndexSeason) => {
    const token = localStorage.getItem("token");
    const res = axios.get<AssetProfitData[]>(backendUrl + "index/data/get_most_profitable_selected_peroiod.php", {
        params: {
            season: season
        },
        headers: {
            Authorization2: `Bearer ${token}`,
        }
    })
    return await res;
}

export const getMostVolatileData = async () => {
    return await axios.get(backendUrl+"index/data/most_volatile.php");
}

export const getCoinCategories = async () => {
    return await axios.get(backendUrl+"index/data/coin_categories.php");
}

export const getLatestCoinmarketcupCoins = async () => {
    return await axios.get(backendUrl+"index/data/last_coinmarketcup_coins.php");
}

export const getGlossaryOverview = async () => {
    return await axios.get(backendUrl+"index/data/DYOR.php");
}

export const getTopMostProfitableAssets = async () => {
    const token = localStorage.getItem("token");
    const response = axios.get(backendUrl+"index/data/top_most_profitable_assets.php", {
        headers: {
            Authorization2: `Bearer ${token}`,
        }
    });
    return await response;
}