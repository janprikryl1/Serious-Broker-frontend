import axios from "axios";
import {backendUrl} from "../../env.ts";
import {
    CryptoCurrencyAdminType,
    CryptoCurrencyDetailType,
    CryptoCurrencyType
} from "../types/asset/CryptoCurrencyType.ts";

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

export const getAllCryptocurrenciesPhoto = async () => {
    return await axios.get<CryptoCurrencyAdminType[]>(`${backendUrl}/cryptocurrency_list/admin_get_all_currencies.php`);
}

export const getAllCategories = async () => {
    return await axios.get(backendUrl + "/cryptocurrency_list/get_all_categories.php");
}

export const getCryptocurrencyById = async (id: string, name: string) => {
    return await axios.get<CryptoCurrencyDetailType>(backendUrl + `cryptocurrency_list/get_cryptocurrency_by_id.php?id=${id}&name=${name}`);
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