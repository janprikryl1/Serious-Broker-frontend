import {FC} from "react";
import {ProfileSessionsList} from "../../components/modules/profile/sessions/ProfileSessionsList.tsx";

export const ProfileSessions: FC = () => {
    return (
        <div className="padding-bottom">
            <div className="service-details__item">
                <div className="service-details__item-inner">
                    <div
                        className="service-details__content"
                        data-aos="fade-up"
                        data-aos-duration="900"
                    >
                        <ProfileSessionsList />
                    </div>
                </div>
            </div>
        </div>
    );
};