import {backendUrl} from "../env.ts";
import axios from "axios";
import {CryptoCurrencyAdminType, CryptoCurrencyNewType} from "../utils/types/CryptoCurrencyType.ts";

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


export const cryptoCurrencyAdd = async (post: CryptoCurrencyNewType) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append('name', post.name);
    formData.append('symbol', post.symbol);
    formData.append('price', String(post.price));
    formData.append('marketcap', post.marketcap);
    formData.append('category', post.category);
    formData.append('max_supply', String(post.max_supply));
    formData.append('circulating_supply', post.circulating_supply);
    formData.append('website', post.website);
    formData.append('whitepaper', post.whitepaper);
    formData.append('reddit', post.reddit);
    formData.append('twitter', post.twitter);
    formData.append('telegram', post.telegram);
    formData.append('cmc_rank', String(post.cmc_rank));
    formData.append('date', post.date);
    if (post.photo) {
        formData.append('photo', post.photo);
    }

    const response = axios.post(backendUrl + "cryptocurrency_list/new_cryptocurrency.php", formData, {
        headers: {
            Authorization2: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });

    return await response;
};

export const deleteCryptocurrency = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = axios.delete(backendUrl + "cryptocurrency_list/delete_cryptocurrency.php", {
        headers: {
            Authorization2: `Bearer ${token}`,
        },
        params: {
            id: id
        }
    });

    return await response;
}