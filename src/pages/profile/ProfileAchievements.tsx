import {FC} from "react";
import {UserAchievementsTimeLine} from "../../components/profile/userAchievments/UserAchievementsTimeLine.tsx";

export const ProfileAchievements:FC = () => {
    return (
        <div className="container padding-bottom">
            <div className="service-details__item" style={{maxWidth:"500px"}}>
                <div className="service-details__item-inner">
                    <div
                        className="service-details__content"
                        data-aos="fade-up"
                        data-aos-duration="900"
                    >
                        <UserAchievementsTimeLine />
                    </div>
                </div>
            </div>
        </div>
    );
}