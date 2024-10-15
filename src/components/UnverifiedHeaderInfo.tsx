import {FC} from "react";
import {useTranslation} from "react-i18next";
import {useUserContext} from "../utils/providers/providerUser.tsx";
import {CiWarning} from "react-icons/ci";

export const UnverifiedHeaderInfo:FC = () => {
    const {t} = useTranslation();
    const {user} = useUserContext();
    
    if (user?.verified == 0) {
        return (
            <header className="header-section" style={{backgroundColor:"red"}}>
                <div className="header-bottom">
                    <div className="container">
                        <div className="header-wrapper d-flex">
                            <div className="menu-area d-flex">
                                <CiWarning size={40} />
                            </div>
                            <div className="menu-area d-flex">
                                <h3>{t("Your email is not verified yet. Please check your email")}</h3>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}