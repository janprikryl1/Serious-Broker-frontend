import axios from "axios";
import {backendUrl} from "../../env.ts";
import {InvestmentPlanType, InvestmentPlanTypeDetails} from "../types/investmentPlan/InvestmentPlanType.ts";

export const getInvestmentPlans = async () => {
    const token = localStorage.getItem('token');
    return await axios.get<InvestmentPlanType[]>(`${backendUrl}/investment_plan/investment_plan.php`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getInvestmentPlansDetails = async () => {
    const token = localStorage.getItem('token');
    return await axios.get<InvestmentPlanTypeDetails[]>(`${backendUrl}/investment_plan/get_investment_plan_details.php`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getInvestmentPlan = async (id: number) => {
    const token = localStorage.getItem('token');
    return await axios.get<InvestmentPlanType>(`${backendUrl}/investment_plan/investment_plan.php?id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const saveInvestmentPlan = async (data: InvestmentPlanType) => {
    const token = localStorage.getItem('token');
    return await axios.post(`${backendUrl}/investment_plan/investment_plan.php`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const deleteInvestmentPlan = async (id: number) => {
    const token = localStorage.getItem('token');
    return await axios.delete(`${backendUrl}/investment_plan/investment_plan.php?id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}