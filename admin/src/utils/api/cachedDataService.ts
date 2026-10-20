import { api } from "@/utils/api/axiosInstance.ts"
import type { CachedDataType } from "@/utils/types/cachedData.ts"

export const getAllCachedData = async (): Promise<CachedDataType[]> => {
  const res = await api.get<CachedDataType[]>("binance/get_chached_data.php")
  return res.data
}

export const downloadFile = async (name: string) => {
  return await api.get("binance/download_chached_file.php", {
    params: { name },
  })
}

export const deleteCachedData = async (name: string) => {
  return await api.delete("binance/get_chached_data.php", {
    params: { name },
  })
}
