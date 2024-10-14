import {FC} from "react";
import {useThemeContext} from "../../utils/providers/ThemeProvider.tsx";
import {UserAchievmentsTimeLine} from "../../components/modules/profile/userAchievments/UserAchievmentsTimeLine.tsx";

export const ProfileAchievements:FC = () => {
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
                    <UserAchievmentsTimeLine />
                </div>
            </div>
        </div>
    );
}