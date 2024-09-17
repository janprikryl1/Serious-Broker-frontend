import {FC} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useUserContext} from "../utils/providers/providerUser.tsx";

export const SignInIcon:FC = () => {
    const {t} = useTranslation();
    const {user} = useUserContext();
    
    return (
        user ?
            <Link to="/profile" className="trk-btn--border trk-btn--primary none" style={{color: "black", borderRadius: "10px"}}>
                {t("Profile")}
            </Link> :   
            <Link to="/sign_in" className="trk-btn--border trk-btn--primary none" style={{color: "black", borderRadius: "10px"}}>
                {t("Sign in")}
            </Link>
    );
}