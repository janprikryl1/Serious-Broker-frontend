import {FC} from "react";
import {TableTemplate} from "../../TableTemplate.tsx";
import {useTranslation} from "react-i18next";

export const NotAuthenticatedIndexTable:FC = () => {
    const {t} = useTranslation();
    
    return (
        <div className="mt-3">
        <TableTemplate title={t("No data available")}>
            <div className="p-4 rounded">
                {t("To access advanced data, login or register for free")}
            </div>
        </TableTemplate>
        </div>
    );
}