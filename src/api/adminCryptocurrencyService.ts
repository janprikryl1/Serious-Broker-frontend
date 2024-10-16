import {backendUrl} from "../env.ts";
import axios from "axios";
import {CryptoCurrencyAdminType} from "../utils/types/CryptoCurrencyType.ts";

export const getAllCryptocurrencies = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    const res = axios.get<CryptoCurrencyAdminType[]>(backendUrl + "cryptocurrency_list/admin_get_all_currencies.php", {
        headers: {
            Authorization2: `Bearer ${token}`,
        },
    });
    return await res;
}

export const cryptoCurrencyUpdate = async (post: CryptoCurrencyAdminType) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append('id', post.id.toString());
    formData.append('name', post.name);
    formData.append('symbol', post.symbol);
    if (post.photo) {
        formData.append('photo', post.photo);
    }
    const response = axios.post(backendUrl + "cryptocurrency_list/upload_image.php", formData, {
        headers: {
            Authorization2: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });

    return await response;
};
