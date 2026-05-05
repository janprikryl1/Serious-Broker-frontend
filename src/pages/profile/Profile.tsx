import {FC} from "react";
import {Outlet} from "react-router-dom";
import {useUserContext} from "../../utils/providers/providerUser.tsx";
import {ProfileSidebar} from "../../components/profile/ProfileSidebar.tsx";
import {useMediaQuery} from "@mui/material";

export const Profile: FC = () => {
    const {user} = useUserContext();
    const isTablet = useMediaQuery("(max-width: 1457px)");

    if (user) {
        return (
            <div style={{display: 'flex'}}>
                {!isTablet && <ProfileSidebar/>}
                <main style={{flex: 1}}>
                    <Outlet/>
                </main>
            </div>
        );
    }
}