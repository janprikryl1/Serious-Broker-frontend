import axios from "axios";
import {backendUrl} from "../../env.ts";
import {BinanceIndexType} from "../types/graphs/BinanceIndexType.ts";

export const getBinanceIndexAbouts = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await axios.get<BinanceIndexType[]>(`${backendUrl}binance_index_about/index_abouts.php`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const updateBinanceIndexAbout = async (id: number, about: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await axios.put(`${backendUrl}binance_index_about/update_binance_index_about.php?id=${id}`, {
        about: about
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}