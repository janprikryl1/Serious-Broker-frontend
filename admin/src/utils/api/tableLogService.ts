import { api } from "@/utils/api/axiosInstance.ts"
import type { TableLogType } from "@/utils/types/tableLog.ts"

export const getAllLogs = async (
  page = 1
): Promise<{ data: TableLogType[]; totalPages: number }> => {
  const res = await api.get<{ data: TableLogType[]; totalPages: number }>(
    "table_log/get_all_logs.php",
    {
      params: { page },
    }
  )
  return res.data
}
