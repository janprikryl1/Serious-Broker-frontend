import { FC } from "react";
import {useTranslation} from "react-i18next";
import {TimeLineComponent} from "../../reusable/TimeLineComponent.tsx";
import {useAchievmentsContext} from "../../../utils/providers/AchievmentsProvider.tsx";

export const UserAchievmentsTimeLine: FC = () => {
    const {t} = useTranslation();
    const { achievements } = useAchievmentsContext();

    return (
        <div className="cta__subscribe">
            <h2 style={{color:"white", fontSize: "40px"}}>{t("Achievements")}</h2>
            <p>{t("List of your achievements")}</p>
            <TimeLineComponent achievements={achievements}/>
        </div>
    );
};
