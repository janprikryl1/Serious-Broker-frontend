import { api } from "@/utils/api/axiosInstance.ts"
import type {
  GenericTableSchema,
  TableSelect,
} from "@/utils/types/genericTable.ts"

export const getMySelects = async (): Promise<TableSelect[]> => {
  const res = await api.get<TableSelect[]>("generic_table/selects.php")
  return res.data
}

export const deleteMySelect = async (id: number) => {
  const res = await api.delete("generic_table/select.php", {
    params: { id },
  })
  return res.data
}

export const getQueryById = async (
  id: string | number
): Promise<TableSelect> => {
  const res = await api.get<TableSelect>("generic_table/select.php", {
    params: { id },
  })
  return res.data
}

export const saveQuery = async (
  query: Partial<TableSelect>,
  id?: string | number
) => {
  if (id) {
    const res = await api.put("generic_table/select.php", query, {
      params: { id },
    })
    return res.data
  }
  const res = await api.post("generic_table/select.php", query)
  return res.data
}

export const getTableSchema = async (
  table: string
): Promise<GenericTableSchema[]> => {
  const res = await api.get<GenericTableSchema[]>(
    "generic_table/table_schema.php",
    {
      params: { table },
    }
  )
  return res.data
}

export const getTableContent = async (
  tableId: string | number
): Promise<Record<string, unknown>[]> => {
  const res = await api.get<Record<string, unknown>[]>(
    "generic_table/table_content.php",
    {
      params: { id: tableId },
    }
  )
  return res.data
}
