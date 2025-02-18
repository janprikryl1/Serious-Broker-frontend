import axios from "axios";
import {WatchListType} from "../types/watchList/WatchListType.ts";
import {backendUrl} from "../../env.ts";
import {WatchListEnum} from "../enums/WatchListEnum.ts";

export const getMyWatchList = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await axios.get<WatchListType[]>(`${backendUrl}watchlist/get_user_watchlist.php`, {
        headers: {
            Authorization2: `Bearer ${token}`
        }
    });
}

export const addToWatchList = async (itemId: number, itemType: WatchListEnum) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await axios.post(`${backendUrl}watchlist/add_to_watchlist.php`, {
        item_id: itemId,
        item_type: itemType
    }, {
        headers: {
            Authorization2: `Bearer ${token}`
        }
    });
}


export const removeFromWatchList = async (itemId: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    return await axios.delete(`${backendUrl}watchlist/remove_from_watchlist.php`, {
        headers: {
            Authorization2: `Bearer ${token}`
        },
        data: { item_id: itemId }
    });
};