import {FC, useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {getDashboardData} from "../../utils/api/adminService.ts";
import {AdminOverviewCard} from "../../components/admin/AdminOverviewCard.tsx";
import {toCzechDateFormat} from "../../utils/functions/dateFunctions.ts";
import {DashboardDataType} from "../../utils/types/user/DashboardDataType.ts";

export const AdminOverview: FC = () => {
    const {t} = useTranslation();
    const [dashboardData, setDashboardData] = useState<DashboardDataType>();
    
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getDashboardData();
                if (!data) return;
                setDashboardData(data.data);
            } catch (e) {
                console.error(e);
            }
        }
        getData();
    }, []);
    
    return (
        <div className="admin-container">
            <h3 className="admin-section-title">Admin dashboard</h3>
            {dashboardData ? (
                <div className="row">
                    <AdminOverviewCard title={t("Article count")} value={dashboardData.article_count} bottom={t("Now")}/>
                    <AdminOverviewCard title={t("User count")} value={dashboardData.user_count} bottom={t("Now")}/>
                    <AdminOverviewCard title={t("Last log")} value={`${dashboardData.last_log.tableName} ${(dashboardData.last_log.action)}`} bottom={toCzechDateFormat(dashboardData.last_log.created)}/>
                </div>
            ) : <p>Loading...</p>}
        </div>
    );
};