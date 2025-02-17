import {FC} from "react";
import {useTranslation} from "react-i18next";
import {FaRegBookmark} from "react-icons/fa";

export const NoItemsInWatchList:FC = () => {
    const {t} = useTranslation();

    return (
        <>
            <p>{t("No items in your watchlist")}</p>
            <p>{t("Start by clicking on watchlist icon")} <FaRegBookmark /></p>
            <p>{t("You can add asset, coin or article to your watchlist")}</p>
        </>
    );
}