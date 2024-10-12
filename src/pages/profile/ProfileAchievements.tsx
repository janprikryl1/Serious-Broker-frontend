import {FC} from "react";
import {useThemeContext} from "../../utils/providers/ThemeProvider.tsx";
import {UserAchievmentsTimeLine} from "../../components/modules/profile/userAchievments/UserAchievmentsTimeLine.tsx";
import {useTranslation} from "react-i18next";

export const ProfileAchievements:FC = () => {
    const { t } = useTranslation();
    const {theme} = useThemeContext();
    
    return (
        <div className="padding-bottom">
            <div className="cta__wrapper">
                <div
                    className="text-center"
                    style={{
                        maxWidth: "500px",
                        gap: "30px",
                        backgroundColor: theme === 'dark' ? "#343a40" : "#f5f8fb",
                        borderRadius: 24,
                        padding: "30px",
                        zIndex: 2,
                        position: 'relative',
                    }}
                    data-aos="fade-up"
                    data-aos-duration="1000"
                >
                    <div className="cta__subscribe">
                        <h2>
                            <span>{t("Achievements")}</span>
                        </h2>
                        <p>{t("List of your achievements")}</p>
                        <UserAchievmentsTimeLine />
                    </div>
                </div>
            </div>
        </div>
    );
}