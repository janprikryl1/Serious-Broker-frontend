import {FC} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {routes} from "../../../utils/constants";
import {Button, ButtonColor} from "../../reusable/Button.tsx";

export const NewPortfolioButton:FC = () => {
    const { t } = useTranslation();
    
    return (
        <Link to={routes.profile.newMyPortfolio} className="text-decoration-none">
            <Button className="w-80 mt-1 mb-5" type="button" color={ButtonColor.yellow} style={{color: "black"}}>{t("Create new portfolio")}</Button>
        </Link>
    );
};