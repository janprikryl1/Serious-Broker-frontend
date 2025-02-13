import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/modules/admin/Sidebar.tsx";

export const Admin: FC = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <main className="container" style={{ flex: 1 }}>
                <Outlet />
            </main>
        </div>
    );
}
