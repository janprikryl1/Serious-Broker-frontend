import axios from "axios";
import {backendUrl} from "../env.ts";
import {CryptoCurrencyCategoryType, CryptoCurrencyType} from "../utils/types/CryptoCurrencyType.ts";

export type DataPagination = {
    data: CryptoCurrencyType[];
    totalPages: number;
    currentPage: number;
}

export const getAllCryptocurrencies = async (page: number, pageSize: number) => {
    const res = await axios.get<DataPagination>(`${backendUrl}/cryptocurrency_list/get_all_cryptocurrencies.php`, {
        params: { page, pageSize }
    });
    return res;
}

export const getAllCategories = async () => {
    const res = axios.get(backendUrl + "/cryptocurrency_list/get_all_categories.php");
    return await res;
}

export const getCryptocurrenciesCategories = async () => {
    const res = axios.get(backendUrl + "/cryptocurrency_list/get_cryptocurrencies_categories.php");
    return await res;
}


export const getCryptocurrenciesByCategory = async (category: string) => {
    const res = axios.get(backendUrl + `/cryptocurrency_list/get_cryptocurrencies_by_category.php?category=${category}`);
    return await res;
}

export const getCryptocurrencyById = async (id: string) => {
    const res = axios.get<CryptoCurrencyCategoryType>(backendUrl + `cryptocurrency_list/get_cryptocurrency_by_id.php?id=${id}`);
    return await res;
}

export const getSearchCryptocurrencies = async (searchValue: string, page: number, pageSize: number) => {
    if (searchValue === "") return getAllCryptocurrencies(page, pageSize);
    const res = await axios.get<DataPagination>(`${backendUrl}/cryptocurrency_list/get_search_cryptocurrencies.php`, {
        params: { 
            text: searchValue,
            page: page,
            pageSize: pageSize
        }
    });
    return res;
}