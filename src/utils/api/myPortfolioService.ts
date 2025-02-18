import axios from "axios";
import {backendUrl} from "../../env.ts";
import {AvailableCoinType} from "../types/myPortfolio/availableCoinType.ts";
import {MyPortfolioType} from "../types/myPortfolio/MyPortfolioType.ts";
import {AssetDetailType} from "../types/asset/AssetDetailType.ts";

export const getAvaliableCoins = async () => {
    return await axios.get<AvailableCoinType[]>(`${backendUrl}/my_portfolio/avaibable_coins.php`);
}

export const getMyPortfolios = async () => {
    const token = localStorage.getItem('token');
    return await axios.get<MyPortfolioType[]>(`${backendUrl}/my_portfolio/portfolios.php`, {
        headers: {
            Authorization2: `Bearer ${token}`
        }
    });
}

export const getMyPortfolioDetails = async (id: number | string) => {
    const token = localStorage.getItem('token');
    return await axios.get<MyPortfolioType>(`${backendUrl}/my_portfolio/portfolio.php?id=${id}`, {
        headers: {
            Authorization2: `Bearer ${token}`
        }
    });
}

export const getMyPortfolioDetailsGraph = async (id: number | string) => {
    const token = localStorage.getItem('token');
    return await axios.get<AssetDetailType>(`${backendUrl}/my_portfolio/portfolio_details.php?id=${id}`, {
        headers: {
            Authorization2: `Bearer ${token}`
        }
    });
}

export const saveMyPortfolio = async (data: MyPortfolioType) => {
    const token = localStorage.getItem('token');
    return await axios.post(`${backendUrl}/my_portfolio/portfolio.php`, data, {
        headers: {
            Authorization2: `Bearer ${token}`
        }
    });
}

export const deleteMyPortfolio = async (id: number) => {
    const token = localStorage.getItem('token');
    return await axios.delete(`${backendUrl}/my_portfolio/portfolio.php?id=${id}`, {
        headers: {
            Authorization2: `Bearer ${token}`
        }
    });
}
