import { api } from "./axiosInstance.ts";
import {CryptoCurrencyAdminType, CryptoCurrencyNewType} from "../types/asset/CryptoCurrencyType.ts";

export const getAllCryptocurrencies = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    return await api.get<CryptoCurrencyAdminType[]>("cryptocurrency_list/admin_get_all_currencies.php");
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
    return await api.post("cryptocurrency_list/upload_image.php", formData);
};

export const stylizedImageUpdate = async (id: number, name: string, symbol: string, file: File) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('name', name);
    formData.append('symbol', symbol);
    formData.append('stylized_image', file);

    return await api.post("cryptocurrency_list/upload_stylized_image.php", formData);
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
    if (post.stylized_image_file) {
        formData.append('stylized_image', post.stylized_image_file);
    }

    return await api.post("cryptocurrency_list/new_cryptocurrency.php", formData);
};

export const deleteCryptocurrency = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    return await api.delete("cryptocurrency_list/delete_cryptocurrency.php", {
        
        params: {
            id: id
        }
    });
}