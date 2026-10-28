import { api } from "@/utils/api/axiosInstance.ts"
import type {
  BinanceIndexListParams,
  BinanceIndexListResponse,
} from "@/utils/types/binanceIndex.ts"

export const getBinanceIndexAbouts = async ({
  page = 1,
  limit = 25,
  search = "",
}: BinanceIndexListParams = {}): Promise<BinanceIndexListResponse> => {
  const res = await api.get<BinanceIndexListResponse>(
    "binance_index_about/index_abouts.php",
    {
      params: {
        page,
        limit,
        // Prázdný filtr se neposílá, ať se requesty cachují podle URL.
        ...(search ? { search } : {}),
      },
    }
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
