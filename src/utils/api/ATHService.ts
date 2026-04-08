import {RecommendationDetailSeasonEnum} from "../enums/RecommendationDetailSeasonEnum.ts";
import axios from "axios";
import {backendUrl} from "../../env.ts";
import {ATHType} from "../types/ATH/ATHType.ts";

export const getBinanceAssetATH = async (assetLabel: string) => {
  return await axios.get<ATHType>(`${backendUrl}binance/get_ath_by_asset.php`, {
    params: {
      asset: assetLabel
    }
  })
}