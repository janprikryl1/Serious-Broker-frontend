import { api } from "./axiosInstance.ts";
import {WatchListType} from "../types/watchList/WatchListType.ts";
import {WatchListEnum} from "../enums/WatchListEnum.ts";

export const getMyWatchList = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await api.get<WatchListType[]>(`watchlist/get_user_watchlist.php`);
}

export const addToWatchList = async (itemId: number, itemType: WatchListEnum) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await api.post(`watchlist/add_to_watchlist.php`, {
        item_id: itemId,
        item_type: itemType
    });
}


export const removeFromWatchList = async (itemId: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    return await api.delete(`watchlist/remove_from_watchlist.php`, {
        
        data: { item_id: itemId }
    });
};