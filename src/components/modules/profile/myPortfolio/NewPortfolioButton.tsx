import {FC} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {routes} from "../../../../utils/constants";

export const NewPortfolioButton:FC = () => {
    const { t } = useTranslation();
    
    return (
        <Link to={routes.profile.newMyPortfolio} className="text-decoration-none">
            <button className="btn btn-outline-warning w-80 mt-1 mb-5">
                <span>{t("Create new portfolio")}</span>
            </button>
        </Link>
    );
};