import { api } from "./axiosInstance.ts";
import {DemoType} from "../types/demos/demoType.ts";
import {CoinmarketCupCoinsListType} from "../types/demos/CoinmarketCupCoinsListType.ts";

export const getAllDemos = async () => {
    return await api.get<DemoType[]>(`demo/get_all_demos.php`);
};

export const getDemoById = async (id: string) => {
    return await api.get<DemoType>(`demo/get_demo_by_id.php`, {
        params: {
            id: id
        }
    });
};

export const deleteDemo = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = api.delete("/demo/delete_demo_by_id.php",{
        params:{
            id: id,
        }
    });

    return await res;
}

export const saveDemo = async (demo: DemoType) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    return await api.post<DemoType>(`demo/save_demo.php`,
        demo);
}

export const getTop10CoinmarketcupCoins = async () => {
    return await api.get<CoinmarketCupCoinsListType[]>(`demo/get_top_ten_coins_on_coinmarketcup.php`);
}