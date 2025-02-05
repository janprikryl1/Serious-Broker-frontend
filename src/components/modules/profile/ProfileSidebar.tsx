import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../../utils/providers/providerUser.tsx";
import { useTranslation } from "react-i18next";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { routes } from "../../../utils/constants";
import { CiLogout } from "react-icons/ci";
import {FaBars, FaUserEdit} from "react-icons/fa";
import { MdOutlineSubscriptions } from "react-icons/md";
import { GrAchievement } from "react-icons/gr";
import { RiCoinsLine } from "react-icons/ri";

export const ProfileSidebar: FC = () => {
    const { t } = useTranslation();
    const { user, logout } = useUserContext();
    const [collapsed, setCollapsed] = useState(Boolean(localStorage.getItem("sidebarCollapsed") ?? ""));
    const [mobileVisible, setMobileVisible] = useState(false);

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
            >
            <Menu menuItemStyles={{
                button: ({ level, active, disabled }) => {
                    if (level === 0) {
                        return {
                            color: disabled ? "#eee" : "#black",
                            backgroundColor: active ? "#ab9641" : undefined,
                            "&:hover": {
                                backgroundColor: "#ab9641 !important",
                                color: "black !important",
                                borderRadius: "8px !important",
                                fontWeight: "bold !important"
                            },
                            [`&.active`]: {
                                backgroundColor: '#ab9641',
                                color: 'black',
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
                <MenuItem icon={<FaUserEdit />} component={<NavLink to={routes.profile.edit} />} className="sidebar-item">
                    {t("Edit profile")}
                </MenuItem>
                <MenuItem icon={<MdOutlineSubscriptions />} component={<NavLink to={routes.profile.membership} />} className="sidebar-item">
                    {t("Membership")}
                </MenuItem>
                <MenuItem icon={<GrAchievement />} component={<NavLink to={routes.profile.achievements} />} className="sidebar-item">
                    {t("Achievements")}
                </MenuItem>
                <MenuItem icon={<RiCoinsLine />} component={<NavLink to={routes.profile.myPortfolio} />} className="sidebar-item">
                    {t("My portfolio")}
                </MenuItem>
                <MenuItem icon={<CiLogout />} onClick={logout} className="sidebar-item">
                    {t("Logout")}
                </MenuItem>
            </Menu>
        </ProSidebar>
            </>
    );
};
