import {FC} from "react";
import {useTranslation} from "react-i18next";
import {GenericTablesProvider} from "../../utils/providers/GenericTablesProvider.tsx";
import {GenericTablesStepper} from "../../components/admin/genericTable/GenericTablesStepper.tsx";

export const AdminGenericTableDataEdit:FC = () => {
    const {t} = useTranslation();
    
    return (
        <GenericTablesProvider>
            <h3 className="admin-section-title">{t("Edit Generic table query")}</h3>
            <GenericTablesStepper/>
        </GenericTablesProvider>
    );
};