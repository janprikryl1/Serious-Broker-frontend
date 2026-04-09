import {FC} from "react";
import {useTranslation} from "react-i18next";
import {FaRegBookmark} from "react-icons/fa";
import {Link} from "react-router-dom";
import {routes} from "../../../utils/constants";

export const NoItemsInWatchList:FC = () => {
    const {t} = useTranslation();

    return (
        <>
            <p>{t("No items in your watchlist")}</p>
            <p>{t("Start by clicking on watchlist icon")} <FaRegBookmark /></p>
            <p>{t("You can add")} {" "} <Link to={routes.assets}>{t("asset")}</Link>, {" "} <Link to={routes.cryptocurrenciesList}>{t("coin")}</Link> {" "} <Link to={routes.articles}>{t("or article")}</Link> {" "} {t("to your watchlist")}</p>
        </>
    );
}