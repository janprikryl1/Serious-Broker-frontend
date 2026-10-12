import { api } from "./axiosInstance.ts";
import {DashboardType} from "../types/dashboard/DashboardType.ts";

export const getDashboardDetails = async () => {
  return await api.get<DashboardType>(`dashboard/dashboard.php`);
};

