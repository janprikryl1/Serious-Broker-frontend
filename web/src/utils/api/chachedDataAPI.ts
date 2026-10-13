import { api } from "./axiosInstance.ts";
import {CachedDataType} from "../types/admin/CachedDataType.ts";

export const getAllChachedData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await api.get<CachedDataType[]>('binance/get_chached_data.php');
}

export const downloadFile = async (name: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await api.get('binance/download_chached_file.php', {
        
        params: {
            name: name,
        }
    });
}

export const deleteChachedData = async (name: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await api.delete('binance/get_chached_data.php', {
        
        params: {
            name: name,
        }
    });
}