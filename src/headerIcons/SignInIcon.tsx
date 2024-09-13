import {FC} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const SignInIcon:FC = () => {
    const {t} = useTranslation();
    
    return (
        
            <Link to="/" className="trk-btn--border trk-btn--primary none" style={{color: "black", borderRadius: "10px"}}>
                {t("Sign in")}
            </Link>
        
    );
}