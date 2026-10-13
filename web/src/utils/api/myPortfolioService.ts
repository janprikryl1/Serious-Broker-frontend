import { api } from "./axiosInstance.ts";
import {AvailableCoinType} from "../types/myPortfolio/availableCoinType.ts";
import {MyPortfolioType} from "../types/myPortfolio/MyPortfolioType.ts";
import {MyPortfolioType as MyPortfolioTypeGraph} from "../types/asset/MyPortfolioType.ts";

export const getAvailableCoins = async () => {
    return await api.get<AvailableCoinType[]>(`my_portfolio/available_coins.php`);
}

export const getMyPortfolios = async () => {
    return await api.get<MyPortfolioType[]>(`my_portfolio/portfolios.php`);
}

export const getMyPortfolioDetails = async (id: number | string) => {
    return await api.get<MyPortfolioType>(`my_portfolio/portfolio.php?id=${id}`);
}

export const getMyPortfolioDetailsGraph = async (id: number | string) => {
    return await api.get<MyPortfolioTypeGraph>(`my_portfolio/portfolio_details.php?id=${id}`);
}

export const saveMyPortfolio = async (data: MyPortfolioType) => {
    return await api.post(`my_portfolio/portfolio.php`, data);
}

export const deleteMyPortfolio = async (id: number) => {
    return await api.delete(`my_portfolio/portfolio.php?id=${id}`);
}

export const getLastPortfolioGraphs = async () => {
    return await api.get(`my_portfolio/my_tree_portfolios_graph_data.php`);
}