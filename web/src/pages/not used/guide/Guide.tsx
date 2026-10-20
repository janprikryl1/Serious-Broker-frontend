import {Outlet} from "react-router-dom";
import {FC} from "react";
import {TitleHeader} from "../../../components/about/TitleHeader.tsx";

export const Guide:FC = () => {
    return (
        <div className="container">
            <TitleHeader title="Guide"/>
            <Outlet/>
        </div>
    )
}