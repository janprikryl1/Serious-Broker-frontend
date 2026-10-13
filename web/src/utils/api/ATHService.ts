import {RecommendationDetailSeasonEnum} from "../enums/RecommendationDetailSeasonEnum.ts";
import { api } from "./axiosInstance.ts";
import {ATHType} from "../types/ATH/ATHType.ts";

export const getBinanceAssetATH = async (assetLabel: string) => {
  return await api.get<ATHType>(`binance/get_ath_by_asset.php`, {
    params: {
      asset: assetLabel
    }
  })
}