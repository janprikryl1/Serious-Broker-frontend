import { FC } from "react";
import { useAchievmentsContext } from "../../../../utils/providers/AchievmentsProvider.tsx";
import {useTranslation} from "react-i18next";
import {TimeLineComponent} from "../../reusable/TimeLineComponent.tsx";

export const UserAchievmentsTimeLine: FC = () => {
    const {t} = useTranslation();
    const { achievements } = useAchievmentsContext();

    return (
        <div className="cta__subscribe">
            <h2 style={{color:"white", fontSize: "40px"}}>{t("Achievements")}</h2>
            <p style={{fontSize:20}}>{t("List of your achievements")}</p>
            <TimeLineComponent achievements={achievements}/>
        </div>
    );
};
