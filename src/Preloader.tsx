import {FC} from "react";
import Logo from "./utils/icons/logo/SB-handwritten-white.svg";

export const Preloader:FC = () => {
    return (
        <div className="preloader">
            <img src={Logo} alt="preloader icon" className="preloader-container"/>
        </div>
    );
}