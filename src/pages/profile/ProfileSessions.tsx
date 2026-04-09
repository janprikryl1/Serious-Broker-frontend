import {FC} from "react";
import {ProfileSessionsList} from "../../components/profile/sessions/ProfileSessionsList.tsx";

export const ProfileSessions: FC = () => {
    return (
        <div className="service-details__item padding-bottom">
            <div className="container service-details__item-inner">
                <div
                    className="service-details__content"
                    data-aos="fade-up"
                    data-aos-duration="900"
                >
                    <ProfileSessionsList />
                </div>
            </div>
        </div>
    );
};