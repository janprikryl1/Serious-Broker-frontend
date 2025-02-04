import {FC} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {routes} from "../../../utils/constants";

export const SignUpBanner:FC = () => {
    const {t} = useTranslation();
    
    return (
        <section className="cta-signup padding-top padding-bottom bg-color">
            <div className="cta__wrapper text-center">
                <p className="mb-4">{t("Sign up for free and unlock the full potential")}</p>
                <button className="trk-btn trk-btn--secondary2"><Link to={routes.register} className="text-decoration-none">{t("Register")}</Link></button>
            </div>
        </section>
    )
}