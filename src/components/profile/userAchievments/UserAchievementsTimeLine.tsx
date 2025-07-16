import { FC } from "react";
import {useTranslation} from "react-i18next";
import {TimeLineComponent} from "../../reusable/TimeLineComponent.tsx";
import {useAchievementsContext} from "../../../utils/providers/AchievementsProvider.tsx";

export const UserAchievementsTimeLine: FC = () => {
    const {t} = useTranslation();
    const { achievements } = useAchievementsContext();

    return (
        <div className="cta__subscribe">
            <h2 className="text-light" style={{ fontSize: "40px"}}>{t("Achievements")}</h2>
            <p>{t("List of your achievements")}</p>
            <TimeLineComponent achievements={achievements}/>
        </div>
    );
};
