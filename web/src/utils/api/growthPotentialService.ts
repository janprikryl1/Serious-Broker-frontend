import { api } from "./axiosInstance.ts";
import {GrowthPotentialType} from "../types/growthPotential/GrowthPotentialType.ts";

export const getGrowthPotential = async () => {
  return await api.get<GrowthPotentialType>(`index/growth_potential.php`, {
    params: {}
  })
}