import { FC } from "react";
import { Outlet } from "react-router-dom";
import {AdminSidebar} from "../../components/admin/AdminSidebar.tsx";
import "../../styles/sass/components/admin.scss";

export const Admin: FC = () => {
    return (
        <div>
            <AdminSidebar />
            <main className="container">
                <Outlet />
            </main>
        </div>
    );
}
