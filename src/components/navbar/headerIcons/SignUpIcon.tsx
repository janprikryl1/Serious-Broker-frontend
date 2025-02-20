import {FC} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {routes} from "../../../utils/constants";

export const SignUpIcon:FC = () => {
    const { t } = useTranslation();
    
    return (
        <Link to={routes.register} className="link-underline-none">
            {t("Register")}
        </Link>
    );
}