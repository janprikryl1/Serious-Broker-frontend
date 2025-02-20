import {FC} from "react";
import {useTranslation} from "react-i18next";
import {TableTemplate} from "../../reusable/TableTemplate.tsx";

export const NotAuthenticatedIndexTable:FC = () => {
    const {t} = useTranslation();
    
    return (
        <div className="mt-3">
        <TableTemplate title={t("Available only for members")}>
            <div className="p-4 rounded">
                {t("To access advanced data, login or register for free")}
            </div>
        </TableTemplate>
        </div>
    );
}