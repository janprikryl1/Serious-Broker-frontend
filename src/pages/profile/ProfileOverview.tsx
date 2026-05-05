import {FC} from "react";
import {useTranslation} from "react-i18next";
import {useAchievementsContext} from "../../utils/providers/AchievementsProvider.tsx";
import {useUserContext} from "../../utils/providers/providerUser.tsx";
import {AdminOverviewCard} from "../../components/admin/AdminOverviewCard.tsx";
import {toCzechDateFormat} from "../../utils/functions/dateFunctions.ts";
import {Highlight} from "../../components/editor/highlights/Highlight.tsx";
import {AchievmentHelp} from "../../components/about/AchievmentHelp.tsx";
import {MyLastPortfolioGraphs} from "../../components/profile/myPortfolio/MyLastPortfolioGraphs.tsx";
import {RecommendedAssets} from "../../components/profile/myPortfolio/RecommendedAssets.tsx";
import {TitleHeader} from "../../components/about/TitleHeader.tsx";

export const ProfileOverview:FC = () => {
    const {t} = useTranslation();
    const {achievements, unreadAchievements} = useAchievementsContext();
    const {user} = useUserContext();
    
    return (
      <>
        <TitleHeader
          title={
            user?.firstname || user?.surname
              ? `${user.firstname} ${user.surname}`
              : t("Profile Overview")
          }
        />
        <div className="container padding-bottom" style={{minHeight: "50vh"}}>
            <div className="row">
                <AdminOverviewCard title={t("Achievments count")}
                                   value={`${t("You have")} ${achievements.length} ${t("achievements")}`}
                                   bottom={t(`${unreadAchievements.length}/${achievements.length} ${t("unread")}`)}/>
                <AdminOverviewCard title={t("Last profile edit")}
                                   value={user?.changed ? toCzechDateFormat(user?.changed) : t("Never")}
                                   bottom={t(`${t("You are here since")} ${toCzechDateFormat(user!.created)}`)}/>
                <AchievmentHelp />
            </div>
        </div>
</>
    );
}