import axios from "axios";
import {backendUrl} from "../../env.ts";
import {AssetProfitData, IndexDataStructure} from "../types/indexPage/IndexDataStructure.ts";
import {IndexSeasonExtended} from "../enums/IndexSeasonEnum.ts";
import {IndexChartsType} from "../enums/IndexChartsTypeEnum.ts";

export const getIndexData = async () => {
    return await axios.get<IndexDataStructure>(backendUrl + "index/index.php");
}

export const getMostProfitableSelectedPeriod = async (season: IndexSeasonExtended, chartType: IndexChartsType) => {
    const token = localStorage.getItem("token");
    const res = axios.get<AssetProfitData[]>(backendUrl + "index/data/get_most_profitable_selected_peroiod.php", {
        params: {
            season: season,
            order: chartType
        },
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return await res;
}

export const getMostVolatileData = async () => {
    return await axios.get(backendUrl+"index/data/most_volatile.php");
}

export const getLatestCoinmarketcupCoins = async () => {
    return await axios.get(backendUrl+"index/data/last_coinmarketcup_coins.php");
}

export const getLastCoinmarketcupCoinsSevenDays = async () => {
    return await axios.get(backendUrl+"index/data/last_coinmarketcup_coins_seven_days.php");
}

export const getGlossaryOverview = async () => {
    return await axios.get(backendUrl+"index/data/DYOR.php");
}