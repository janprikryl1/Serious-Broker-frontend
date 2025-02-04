import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/modules/admin/Sidebar.tsx";

export const Admin: FC = () => {
    return (
        <div style={{ display: 'flex', backgroundColor:"#25231f" }}>
            <Sidebar />
            <main style={{ flex: 1, paddingTop: '20px' }}>
                <Outlet />
            </main>
        </div>
    );
}
