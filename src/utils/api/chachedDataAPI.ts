import axios from "axios";
import {backendUrl} from "../../env.ts";
import {ChachedDataType} from "../types/admin/ChachedDataType.ts";

export const getAllChachedData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await axios.get<ChachedDataType[]>(backendUrl+'binance/get_chached_data.php', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export const downloadFile = async (name: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await axios.get(backendUrl+'binance/download_chached_file.php', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            name: name,
        }
    });
}

export const deleteChachedData = async (name: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await axios.delete(backendUrl+'binance/get_chached_data.php', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            name: name,
        }
    });
}