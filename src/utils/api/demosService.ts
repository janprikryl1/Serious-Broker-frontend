import axios from "axios";
import {backendUrl} from "../../env.ts";
import {DemoType} from "../types/demos/demoType.ts";
import {CoinmarketCupCoinsListType} from "../types/demos/CoinmarketCupCoinsListType.ts";

export const getAllDemos = async () => {
    return await axios.get<DemoType[]>(`${backendUrl}demo/get_all_demos.php`);
};

export const getDemoById = async (id: string) => {
    return await axios.get<DemoType>(`${backendUrl}demo/get_demo_by_id.php`, {
        params: {
            id: id
        }
    });
};

export const deleteDemo = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = axios.delete(backendUrl+"/demo/delete_demo_by_id.php",{
        params:{
            id: id,
        },
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });

    return await res;
}

export const saveDemo = async (demo: DemoType) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    return await axios.post<DemoType>(`${backendUrl}/demo/save_demo.php`,
        demo, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
}

export const getTop10CoinmarketcupCoins = async () => {
    return await axios.get<CoinmarketCupCoinsListType[]>(`${backendUrl}/demo/get_top_ten_coins_on_coinmarketcup.php`);
}