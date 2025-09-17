import {FC, useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { CiLogout } from "react-icons/ci";
import {FaBars, FaRegBookmark, FaUserEdit} from "react-icons/fa";
import {MdDevicesOther, MdOutlineSubscriptions} from "react-icons/md";
import { GrAchievement } from "react-icons/gr";
import { RiCoinsLine } from "react-icons/ri";
import { useUserContext } from "../../utils/providers/providerUser";
import {routes} from "../../utils/constants";

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
                backgroundColor="#333"
                style={{position:"absolute"}}
            >
                <Menu menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                        if (level === 0) {
                            return {
                                color: disabled ? "#eee" : "#0A0704",
                                backgroundColor: active ? "#B1974E" : undefined,
                                "&:hover": {
                                    backgroundColor: "#B1974E !important",
                                    color: "#0A0704 !important",
                                    borderRadius: "8px !important",
                                    fontWeight: "bold !important"
                                },
                                [`&.active`]: {
                                    backgroundColor: '#B1974E',
                                    color: '#0A0704',
                                },
                            };
                        }
                    },
                }}>
                    <MenuItem
                        icon={<FaBars />}
                        onClick={collapseToggle}
                        className="sidebar-header"
                    >
                        {user && !collapsed ? `${user.firstname} ${user.surname}` : ""}
                    </MenuItem>
                    <MenuItem icon={<RiCoinsLine />} component={<NavLink to={routes.profile.myPortfolio} />} className="sidebar-item">
                        {t("My portfolio")}
                    </MenuItem>
                    <MenuItem icon={<FaUserEdit />} component={<NavLink to={routes.profile.edit} />} className="sidebar-item">
                        {t("Edit profile")}
                    </MenuItem>
                    <MenuItem icon={<FaRegBookmark />} component={<NavLink to={routes.profile.myWatchList} />} className="sidebar-item">
                        {t("My watch list")}
                    </MenuItem>
                    <MenuItem icon={<MdDevicesOther />} component={<NavLink to={routes.profile.sessions} />} className="sidebar-item">
                        {t("Sessions")}
                    </MenuItem>
                    <MenuItem icon={<MdOutlineSubscriptions />} component={<NavLink to={routes.profile.membership} />} className="sidebar-item">
                        {t("Membership")}
                    </MenuItem>
                    <MenuItem icon={<GrAchievement />} component={<NavLink to={routes.profile.achievements} />} className="sidebar-item">
                        {t("Achievements")}
                    </MenuItem>
                    <MenuItem icon={<CiLogout />} onClick={logout} className="sidebar-item">
                        {t("Logout")}
                    </MenuItem>
                </Menu>
            </ProSidebar>
        </>
    );
};
