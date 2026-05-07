import axios from "axios";
import { backendUrl } from "../../env.ts";
import {DashboardType} from "../types/dashboard/DashboardType.ts";

export const getDashboardDetails = async () => {
  const token = localStorage.getItem("token");
  return await axios.get<DashboardType>(`${backendUrl}/dashboard/dashboard.php`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

