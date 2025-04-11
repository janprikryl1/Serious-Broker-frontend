import axios from "axios";
import {CryptoCurrencyDetailType, CryptoCurrencyType} from "../types/CryptoCurrencyType.ts";
import {backendUrl} from "../../env.ts";

export type DataPagination = {
    data: CryptoCurrencyType[];
    totalPages: number;
    currentPage: number;
}

export const getAllCryptocurrencies = async (page: number, pageSize: number) => {
    return await axios.get<DataPagination>(`${backendUrl}/cryptocurrency_list/get_all_cryptocurrencies.php`, {
        params: {page, pageSize}
    });
}

export const getAllCategories = async () => {
    const res = axios.get(backendUrl + "/cryptocurrency_list/get_all_categories.php");
    return await res;
}

export const getCryptocurrencyById = async (id: string) => {
    const res = axios.get<CryptoCurrencyDetailType>(backendUrl + `cryptocurrency_list/get_cryptocurrency_by_id.php?id=${id}`);
    return await res;
}

export const getSearchCryptocurrencies = async (searchValue: string, page: number, pageSize: number) => {
    if (searchValue === "") return getAllCryptocurrencies(page, pageSize);
    return await axios.get<DataPagination>(`${backendUrl}/cryptocurrency_list/get_search_cryptocurrencies.php`, {
        params: {
            text: searchValue,
            page: page,
            pageSize: pageSize
        }
    });
}