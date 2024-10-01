import { FC, useEffect } from "react";
import { useUserContext } from "../../utils/providers/providerUser.tsx";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "../../components/modules/admin/Sidebar.tsx";
import {routes} from "../../utils/constants";

export const Admin: FC = () => {
    const { user } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate(routes.home);
        }
    }, [user]);

    if (!user) {
        return <Navigate to={routes.home}/>;
    }

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={{ flex: 1, padding: '20px' }}>
                <Outlet />
            </main>
        </div>
    );
}
