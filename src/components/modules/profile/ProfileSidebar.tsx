import {FC} from "react";
import {useTranslation} from "react-i18next";
import {useUserContext} from "../../../utils/providers/providerUser.tsx";
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem
} from "cdbreact";
import {NavLink} from "react-router-dom";
import {routes} from "../../../utils/constants";
import {Button} from "react-bootstrap";

export const ProfileSidebar:FC = () => {
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
                            to={routes.profile.edit}
                            className={({ isActive }) => isActive ? 'activeClicked' : ''}
                        >
                            <CDBSidebarMenuItem icon="user">{t("Edit profile")}</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink
                            to={routes.profile.achievements}
                            className={({ isActive }) => isActive ? 'activeClicked' : ''}
                        >
                            <CDBSidebarMenuItem icon="chart-line">{t("Achievements")}</CDBSidebarMenuItem>
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
}