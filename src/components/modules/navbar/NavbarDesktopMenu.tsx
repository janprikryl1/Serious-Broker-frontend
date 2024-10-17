import {FC} from "react";
import {Link} from "react-router-dom";
import {routes} from "../../../utils/constants";
import {useTranslation} from "react-i18next";
import {useUserContext} from "../../../utils/providers/providerUser.tsx";

export const NavbarDesktopMenu:FC = () => {
    const {t} = useTranslation();
    const {user} = useUserContext();
    
    return (
        <div className="menu-area d-none d-lg-flex align-items-center">
            <ul className="menu menu--style1 d-flex align-items-center">
                <li className="mr-2">
                    <Link to={routes.articles} className="link-underline-none">{t("Articles")}</Link>
                </li>
                <li className="menu-item-has-children mr-2">
                    <Link to={routes.graphs} className="link-underline-none">{t("Graphs")}</Link>
                    <ul className="submenu">
                        <li><Link to={routes.recommendation}
                                  className="link-underline-none">{t("Recommendation")}</Link></li>
                        {user && (
                            <>
                                <li><Link to={routes.mostProfitableAssets}
                                          className="link-underline-none">{t("Most profitable assets")}</Link></li>
                                <li><Link to={routes.assets} className="link-underline-none">{t("Assets")}</Link></li>
                            </>
                        )}
                    </ul>
                </li>
                <li className="mr-2">
                    <Link to={routes.contact} className="link-underline-none">{t("Contact")}</Link>
                </li>
            </ul>
        </div>
    )
}