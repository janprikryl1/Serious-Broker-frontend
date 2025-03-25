import axios from "axios";
import {backendUrl} from "../../env.ts";
import {ChachedDataType} from "../types/ChachedDataType.ts";

export const getAllChachedData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    const response = axios.get<ChachedDataType[]>(backendUrl+'binance/get_chached_data.php', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return await response;
}

export const downloadFile = async (name: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    const response = axios.get(backendUrl+'binance/download_chached_file.php', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            name: name,
        }
    });
    return await response;
}

export const deleteChachedData = async (name: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    const response = axios.delete(backendUrl+'binance/get_chached_data.php', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            name: name,
        }
    });
    return await response;
}