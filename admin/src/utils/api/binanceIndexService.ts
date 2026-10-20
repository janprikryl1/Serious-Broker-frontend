import { api } from "@/utils/api/axiosInstance.ts"
import type { BinanceIndexType } from "@/utils/types/binanceIndex.ts"

export const getBinanceIndexAbouts = async (): Promise<BinanceIndexType[]> => {
  const res = await api.get<BinanceIndexType[]>(
    "binance_index_about/index_abouts.php"
  )
  return res.data
}

export const updateBinanceIndexAbout = async (id: number, about: string) => {
  const res = await api.put(
    `binance_index_about/update_binance_index_about.php?id=${id}`,
    { about }
  )
  return res.data
}
