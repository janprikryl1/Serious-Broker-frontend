import { api } from "./axiosInstance.ts";
import {BinanceIndexType} from "../types/graphs/BinanceIndexType.ts";

export const getBinanceIndexAbouts = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await api.get<BinanceIndexType[]>(`binance_index_about/index_abouts.php`);
}

export const updateBinanceIndexAbout = async (id: number, about: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await api.put(`binance_index_about/update_binance_index_about.php?id=${id}`, {
        about: about
    });
}