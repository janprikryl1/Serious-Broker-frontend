import {FC} from "react";
import {Outlet} from "react-router-dom";
import {useUserContext} from "../../utils/providers/providerUser.tsx";
import {ProfileSidebar} from "../../components/modules/profile/ProfileSidebar.tsx";

export const Profile: FC = () => {
    const {user} = useUserContext();
    
    if (user) {
        return (
            <div style={{display: 'flex', backgroundColor:"#25231f"}}>
                <ProfileSidebar/>
                <main style={{flex: 1, padding: '20px'}}>
                    <Outlet/>
                </main>
            </div>
        );
    }
}