import {FC} from "react";
import {useUserContext} from "../utils/providers/providerUser.tsx";
import {Outlet} from "react-router-dom";
import {ProfileSidebar} from "../components/modules/profile/ProfileSidebar.tsx";

export const Profile: FC = () => {
    const {user} = useUserContext();
    
    if (user) {
        return (
            <div style={{display: 'flex'}}>
                <ProfileSidebar/>
                <main style={{flex: 1, padding: '20px'}}>
                    <Outlet/>
                </main>
            </div>
        );
    }
}