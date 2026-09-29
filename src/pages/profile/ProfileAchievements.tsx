import {FC} from "react";
import {UserAchievementsTimeLine} from "../../components/profile/userAchievments/UserAchievementsTimeLine.tsx";
import {TitleHeader} from "../../components/about/TitleHeader.tsx";
import {useTranslation} from "react-i18next";

export const ProfileAchievements:FC = () => {
    const {t} = useTranslation();
    
    return (
      <>
        <TitleHeader title={t("Achievements")} />
        <div className="container padding-bottom">
            <div className="" style={{maxWidth:"500px"}}>
                <div className="">
                    <div
                        className=""
                        data-aos="fade-up"
                        data-aos-duration="900"
                    >
                        <UserAchievementsTimeLine />
                    </div>
                </div>
            </div>
        </div>
      </>
    );
}