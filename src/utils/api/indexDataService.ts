import { api } from "./axiosInstance.ts";
import {AssetProfitData, IndexDataStructure} from "../types/overviewTypes/IndexDataStructure.ts";
import {IndexSeasonExtended} from "../enums/IndexSeasonEnum.ts";
import {IndexChartsType} from "../enums/IndexChartsTypeEnum.ts";

export const getIndexData = async () => {
    return await api.get<IndexDataStructure>("index/index.php");
}

export const getMostProfitableSelectedPeriod = async (season: IndexSeasonExtended, chartType: IndexChartsType) => {
    return await api.get<AssetProfitData[]>("index/data/get_most_profitable_selected_peroiod.php", {
        params: {
            season: season,
            order: chartType
        }
    })
}

export const getMostVolatileData = async () => {
    return await api.get("index/data/most_volatile.php");
}

export const getLatestCoinmarketcupCoins = async () => {
    return await api.get("index/data/last_coinmarketcup_coins.php");
}

export const getLastCoinmarketcupCoinsSevenDays = async () => {
    return await api.get("index/data/last_coinmarketcup_coins_seven_days.php");
}

export const getGlossaryOverview = async () => {
    return await api.get("index/data/DYOR.php");
}