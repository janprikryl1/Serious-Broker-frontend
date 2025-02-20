import {FC} from "react";
import Skeleton from "react-loading-skeleton";
import {useThemeContext} from "../../../utils/providers/ThemeProvider.tsx";

export const MembershipDetailsSkeleton:FC = () => {
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
                    <h2>
                        <Skeleton width={200} height={30}/>
                    </h2>
                    <p>
                        <Skeleton width={300} height={20}/>
                    </p>
                    <Skeleton width="100%" height={200}/>
                </div>
            </div>
        </div>
    );
};