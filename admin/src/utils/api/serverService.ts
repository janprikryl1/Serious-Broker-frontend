import { api } from "@/utils/api/axiosInstance.ts"
import type {
  ErrorLogParams,
  ErrorLogResponse,
  ServerInfoResponse,
} from "@/utils/types/server.ts"

export const getServerInfo = async (): Promise<ServerInfoResponse> => {
  const res = await api.get<ServerInfoResponse>("server/get_info.php")
  return res.data
}

export const getErrorLog = async (
  params: ErrorLogParams = {}
): Promise<ErrorLogResponse> => {
  const res = await api.get<ErrorLogResponse>("server/get_error_log.php", {
    params: {
      limit: params.limit ?? 200,
      level: params.level ?? "all",
      // Prázdný filtr se neposílá, ať se requesty dají cachovat podle URL.
      ...(params.search ? { search: params.search } : {}),
      order: params.order ?? "desc",
    },
  })
  return res.data
}

export const clearErrorLog = async (): Promise<{ message: string }> => {
  const res = await api.post<{ message: string }>("server/clear_error_log.php")
  return res.data
}
