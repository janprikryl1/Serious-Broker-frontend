import {FC} from "react";
import {Outlet} from "react-router-dom";
import "../../styles/sass/components/admin.scss";

export const EditorOverview:FC = () => {
    return (
        <Outlet/>
    );
};