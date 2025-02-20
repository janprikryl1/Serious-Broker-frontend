import { FC } from "react";
import { Outlet } from "react-router-dom";
import {AdminSidebar} from "../../components/admin/AdminSidebar.tsx";

export const Admin: FC = () => {
    return (
        <div style={{ display: 'flex' }}>
            <AdminSidebar />
            <main className="container" style={{ flex: 1 }}>
                <Outlet />
            </main>
        </div>
    );
}
