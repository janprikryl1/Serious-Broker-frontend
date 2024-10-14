import { FC } from "react";
import { useAchievmentsContext } from "../../../../utils/providers/AchievmentsProvider.tsx";
import {useTranslation} from "react-i18next";
import {TimeLineComponent} from "../../reusable/TimeLineComponent.tsx";

export const UserAchievmentsTimeLine: FC = () => {
    const {t} = useTranslation();
    const { achievements } = useAchievmentsContext();

    return (
        <div className="cta__subscribe">
            <h2>
                <span>{t("Achievements")}</span>
            </h2>
            <p>{t("List of your achievements")}</p>
            <TimeLineComponent achievements={achievements}/>
        </div>
    );
};
