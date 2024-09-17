import {TitleHeader} from "../components/modules/about/TitleHeader.tsx";
import {FC} from "react";
import {useUserContext} from "../utils/providers/providerUser.tsx";
import {Button} from "react-bootstrap";

export const Profile: FC = () => {
    const {user, logout} = useUserContext();
    
    
    return (
        <>
            <TitleHeader title="Profile"/>
            {user ? (
                <Button onClick={logout}>Logout</Button>
            ) : <div>Loading...</div>}
            
        </>
    );
}