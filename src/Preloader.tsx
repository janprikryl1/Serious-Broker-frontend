import {FC} from "react";
import Logo from "./utils/icons/logo/symbol.svg";

export const Preloader:FC = () => {
    return (
        <div className="preloader">
            <img src={Logo} alt="preloader icon" width={100} height={100}/>
        </div>
    );
}