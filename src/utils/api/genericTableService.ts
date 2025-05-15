import axios from "axios";
import { backendUrl } from "../../env.ts";
import { TableSelect } from "../types/admin/TableSelect.ts";
import { GenericTableSchema } from "../types/admin/GenericTableSchema.ts";

const token = () => localStorage.getItem('token');

export const getMySelects = async () => {
    return await axios.get(`${backendUrl}generic_table/selects.php`, {
        headers: {
            'Authorization': `Bearer ${token()}`,
        }
    });
};

export const deleteMySelect = async (id: number) => {
    return await axios.delete(`${backendUrl}generic_table/select_detail.php`, {
        params: { id },
        headers: {
            'Authorization': `Bearer ${token()}`,
        }
    });
};

export const getQueryById = async (id: string | number) => {
    return await axios.get<TableSelect>(`${backendUrl}generic_table/select.php`, {
        params: { id },
        headers: {
            'Authorization': `Bearer ${token()}`,
        }
    });
};

export const saveQuery = async (query: Partial<TableSelect>, id?: string) => {
    if (id) {
        // UPDATE (PUT)
        return await axios.put(`${backendUrl}generic_table/select.php`, query, {
            params: { id: id },
            headers: {
                'Authorization': `Bearer ${token()}`,
            }
        });
    } else {
        // CREATE (POST)
        return await axios.post(`${backendUrl}generic_table/select.php`, query, {
            headers: {
                'Authorization': `Bearer ${token()}`,
            }
        });
    }
};

export const getTableSchema = async (table: string) => {
    return await axios.get<GenericTableSchema[]>(`${backendUrl}generic_table/table_schema.php`, {
        params: { table },
        headers: {
            'Authorization': `Bearer ${token()}`,
        }
    });
};
