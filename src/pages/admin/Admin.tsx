import {FC, useEffect} from "react";
import {useUserContext} from "../../utils/providers/providerUser.tsx";
import {useNavigate} from "react-router-dom";

export const Admin:FC = () => {
    const {user} = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/");
        }
    }, [user]);
    
    
        return (
            <div>
                Admin panel
                

            </div>
        )
    
}