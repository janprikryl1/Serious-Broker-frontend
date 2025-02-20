import {FC} from "react";
import {UserAchievmentsTimeLine} from "../../components/profile/userAchievments/UserAchievmentsTimeLine.tsx";

export const ProfileAchievements:FC = () => {
    return (
        <div className="padding-bottom">
            <div className="service-details__item" style={{maxWidth:"500px"}}>
                <div className="service-details__item-inner">
                    <div
                        className="service-details__content"
                        data-aos="fade-up"
                        data-aos-duration="900"
                    >
                        <UserAchievmentsTimeLine />
                    </div>
                </div>
            </div>
        </div>
    );
}