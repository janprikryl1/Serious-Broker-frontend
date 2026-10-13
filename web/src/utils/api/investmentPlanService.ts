import { api } from "./axiosInstance.ts";
import {InvestmentPlanType, InvestmentPlanTypeDetails} from "../types/investmentPlan/InvestmentPlanType.ts";

export const getInvestmentPlans = async () => {
    return await api.get<InvestmentPlanType[]>(`investment_plan/investment_plan.php`);
}

export const getInvestmentPlansDetails = async () => {
    return await api.get<InvestmentPlanTypeDetails[]>(`investment_plan/get_investment_plan_details.php`);
}

export const getInvestmentPlan = async (id: number) => {
    return await api.get<InvestmentPlanType>(`investment_plan/investment_plan.php?id=${id}`);
}

export const saveInvestmentPlan = async (data: InvestmentPlanType) => {
    return await api.post(`investment_plan/investment_plan.php`, data);
}

export const deleteInvestmentPlan = async (id: number) => {
    return await api.delete(`investment_plan/investment_plan.php?id=${id}`);
}