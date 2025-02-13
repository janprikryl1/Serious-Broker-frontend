import {FC} from "react";
import {AdminOverviewCard} from "../../components/modules/admin/AdminOverviewCard.tsx";
import {useTranslation} from "react-i18next";
import {useAchievmentsContext} from "../../utils/providers/AchievmentsProvider.tsx";
import {useUserContext} from "../../utils/providers/providerUser.tsx";
import {toCzechDateFormat} from "../../utils/constants/functions.ts";

export const ProfileOverview:FC = () => {
    const {t} = useTranslation();
    const {achievements, unreadAchievements} = useAchievmentsContext();
    const {user} = useUserContext();
    
    return (
        <div className="padding-bottom" style={{minHeight: "50vh"}}>             
            <h3 className="admin-section-title">{t("Profile overview")}</h3>
            <div className="row">
                <AdminOverviewCard title={t("Achievments count")} value={`${t("You have")} ${achievements.length} ${t("achievements")}`} bottom={t(`${unreadAchievements.length}/${achievements.length} ${t("unread")}`)}/>
                <AdminOverviewCard title={t("Last profile edit")} value={user?.changed ? toCzechDateFormat(user?.changed) : t("Never")} bottom={t(`${t("You are here since")} ${toCzechDateFormat(user!.created)}`)}/>
            </div>
        </div>
    );
}