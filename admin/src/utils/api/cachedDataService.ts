import { api } from "@/utils/api/axiosInstance.ts"
import type {
  CachedDataResponse,
  StorageUsageResponse,
} from "@/utils/types/cachedData.ts"

export const CACHE_QUERY_KEY = ["admin", "cachedData"]
export const STORAGE_QUERY_KEY = ["admin", "storageUsage"]

export const getAllCachedData = async (): Promise<CachedDataResponse> => {
  const res = await api.get<CachedDataResponse>("binance/get_chached_data.php")
  return res.data
}

/** Obsazené místo logů, cache, dat a nahraných médií na serveru. */
export const getStorageUsage = async (): Promise<StorageUsageResponse> => {
  const res = await api.get<StorageUsageResponse>(
    "server/get_storage_usage.php"
  )
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
