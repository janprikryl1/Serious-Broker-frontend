import axios from "axios";
import {backendUrl} from "../../env.ts";
import {GrowthPotentialType} from "../types/growthPotential/GrowthPotentialType.ts";

export const getGrowthPotential = async () => {
  return await axios.get<GrowthPotentialType>(`${backendUrl}/index/growth_potential.php`, {
    params: {}
  })
}