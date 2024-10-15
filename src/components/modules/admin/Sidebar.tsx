import { FC } from "react";
import { NavLink } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { useUserContext } from "../../../utils/providers/providerUser.tsx";
import { useTranslation } from "react-i18next";
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem
} from 'cdbreact';
import {adminURLS} from "../../../utils/constants";

export const Sidebar: FC = () => {
    const { t } = useTranslation();
    const { user, logout } = useUserContext();

    return (
        <div style={{ display: 'flex', overflow: 'scroll initial', zIndex: 0 }}>
            <CDBSidebar textColor="#fff" backgroundColor="#333" breakpoint={200} className="" maxWidth="100%" minWidth="50%" toggled={false}>
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    {user && (user.firstname + " " + user.surname)}
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink
                            to={adminURLS.users}
                            className={({ isActive }) => isActive ? 'activeClicked' : ''}
                        >
                            <CDBSidebarMenuItem icon="user">{t("User management")}</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink
                            to={adminURLS.newsletter}
                            className={({ isActive }) => isActive ? 'activeClicked' : ''}
                        >
                            <CDBSidebarMenuItem icon="chart-line">{t("Newsletter management")}</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink
                            to={adminURLS.articles}
                            className={({ isActive }) => isActive ? 'activeClicked' : ''}
                        >
                            <CDBSidebarMenuItem icon="table">{t("Article management")}</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink
                            to={adminURLS.glossary}
                            className={({ isActive }) => isActive ? 'activeClicked' : ''}
                        >
                            <CDBSidebarMenuItem icon="exclamation-circle">{t("Glossary")}</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink
                            to={adminURLS.logTable}
                            className={({ isActive }) => isActive ? 'activeClicked' : ''}
                        >
                            <CDBSidebarMenuItem icon="th-large">{t("Table logs")}</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink
                            to={adminURLS.feedbacks}
                            className={({ isActive }) => isActive ? 'activeClicked' : ''}
                        >
                            <CDBSidebarMenuItem icon="sticky-note">{t("Feedbacks")}</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink
                            to={adminURLS.achievements}
                            className={({ isActive }) => isActive ? 'activeClicked' : ''}
                        >
                            <CDBSidebarMenuItem icon="gamepad">{t("Achievements")}</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink
                            to={adminURLS.coinSettings}
                            className={({ isActive }) => isActive ? 'activeClicked' : ''}
                        >
                            <CDBSidebarMenuItem icon="credit-card">{t("Coins")}</CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter>
                    <div style={{ padding: '20px 5px', textAlign: 'center' }}>
                        <Button variant="outline-warning" onClick={logout}>{t("Logout")}</Button>
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    );
};
