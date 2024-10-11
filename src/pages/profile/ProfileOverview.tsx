import {FC, useEffect, useState} from "react";
import {AdminOverviewCard} from "../../components/modules/admin/AdminOverviewCard.tsx";
import {useTranslation} from "react-i18next";
import {DashboardDataType} from "../../utils/types/DashboardDataType.ts";
import {getDashboardData} from "../../api/adminService.ts";

export const ProfileOverview:FC = () => {
    const {t} = useTranslation();
    const [profileOverviewData, setProfileOverviewData] = useState<DashboardDataType>();

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getDashboardData();
                if (!data) return;
                setProfileOverviewData(data.data);
            } catch (e) {
                console.error(e);
            }
        }
        getData();
    }, []);

    
    return (
        <div>
            <div className="page-header">
                <h3>{t("Profile overview")}</h3>
            </div>
            {profileOverviewData ? (
                <div className="row">
                    <AdminOverviewCard title={t("Article count")} value={"dashboardData.article_count"} bottom={t("Now")}/>
                    <AdminOverviewCard title={t("User count")} value={"dashboardData.user_count"} bottom={t("Now")}/>
                </div>
            ) : <p>Loading...</p>}
        </div>
    );
}