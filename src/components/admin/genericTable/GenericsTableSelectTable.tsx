import {FC} from "react";
import {useTranslation} from "react-i18next";
import {useGenericTablesContext} from "../../../utils/providers/GenericTablesProvider.tsx";
import {AdminGenericTableOptions} from "../../../utils/options/AdminGenericTableOptions.ts";

export const GenericsTableSelectTable:FC = () => {
    const {t} = useTranslation();
    const {table, setTable} = useGenericTablesContext();
    
    return (
        <div className="admin-generic-table-select-table">
            <h3>{t("Select table")}</h3>
            <select
                className="form-select"
                style={{maxWidth: "300px"}}
                value={table}
                onChange={(e) => setTable(e.target.value)}
            >
                {AdminGenericTableOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}