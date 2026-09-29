import {FC, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Menu, MenuItem, Sidebar as ProSidebar} from "react-pro-sidebar";
import {FaBars, FaRegBookmark} from "react-icons/fa";
import {FaTrafficLight} from "react-icons/fa6";
import {IoFileTrayOutline} from "react-icons/io5";
import {useUserContext} from "../../utils/providers/providerUser";
import {routes} from "../../utils/constants";
import {AiOutlineFundProjectionScreen} from "react-icons/ai";
import {IoIosArrowBack} from "react-icons/io";

export const ProfileSidebar: FC = () => {
    const { t } = useTranslation();
    const { user, logout } = useUserContext();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileVisible, setMobileVisible] = useState(false);

    useEffect(() => {
        setCollapsed(Boolean(localStorage.getItem("sidebarCollapsed") ?? ""));
    }, []);
    
    const collapseToggle = () => {
        const newCollapsed = !collapsed;
        setCollapsed(newCollapsed);
        localStorage.setItem("sidebarCollapsed", newCollapsed.toString());
    };

    const toggleMobileSidebar = () => {
        setMobileVisible(!mobileVisible);
    };

    return (
        <>
            <button className="mobile-sidebar-toggle" onClick={toggleMobileSidebar}>
                <FaBars />
            </button>

            <ProSidebar
                collapsed={collapsed}
                className={`custom-sidebar ${mobileVisible ? "mobile-visible" : ""}`}
                backgroundColor="transparent"
                style={{position:"absolute"}}
                width="270px"
                collapsedWidth="80px"
            >
                <Menu menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                        if (level === 0) {
                            return {
                                color: disabled ? "var(--gray-4-color)" : "var(--gray-3-color)",
                            };
                        }
                    },
                }}>
                    <MenuItem
                        icon={<IoIosArrowBack
                            style={{
                                transform: collapsed ? "rotate(0deg)" : "rotate(180deg)",
                                transition: "transform 0.3s ease"
                            }}
                        />}
                        onClick={collapseToggle}
                        className="sidebar-header"
                    >
                        <b>{!collapsed ? t("Investment Profile") : ""}</b>
                    </MenuItem>
                    <MenuItem icon={<IoFileTrayOutline />} component={<NavLink to={routes.profile.myPortfolio} />} className="sidebar-item">
                        {t("Portfolios")}
                    </MenuItem>
                    <MenuItem icon={<AiOutlineFundProjectionScreen />} component={<NavLink to={routes.profile.myInvestmentPlans} />} className="sidebar-item">
                        {t("Investment plans")}
                    </MenuItem>
                    <MenuItem icon={<FaTrafficLight />} component={<NavLink to={routes.profile.myTrafficLights} />} className="sidebar-item">
                        {t("Market traffic lights")}
                    </MenuItem>
                    <MenuItem icon={<FaRegBookmark />} component={<NavLink to={routes.profile.myWatchList} />} className="sidebar-item">
                        {t("Watchlist")}
                    </MenuItem>
                </Menu>
            </ProSidebar>
        </>
    );
};
