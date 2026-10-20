import { api } from "./axiosInstance.ts";
import { TableSelect } from "../types/admin/TableSelect.ts";
import { GenericTableSchema } from "../types/admin/GenericTableSchema.ts";

export const getMySelects = async () => {
    return await api.get(`generic_table/selects.php`);
};

export const deleteMySelect = async (id: number) => {
    return await api.delete(`generic_table/select.php`, {
        params: { id }
    });
};

export const getQueryById = async (id: string | number) => {
    return await api.get<TableSelect>(`generic_table/select.php`, {
        params: { id }
    });
};

export const saveQuery = async (query: Partial<TableSelect>, id?: string) => {
    if (id) {
        // UPDATE (PUT)
        return await api.put(`generic_table/select.php`, query, {
            params: { id: id }
        });
    } else {
        // CREATE (POST)
        return await api.post(`generic_table/select.php`, query);
    }
};

export const getTableSchema = async (table: string) => {
    return await api.get<GenericTableSchema[]>(`generic_table/table_schema.php`, {
        params: { table }
    });
};

export const getTableContent = async (tableId: string) => {
    return await api.get(`generic_table/table_content.php`, {
        params: { id: tableId }
    });
};