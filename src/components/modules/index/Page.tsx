import { FC } from "react";
import Logo from "../../../utils/icons/logo/SB2.svg";


export const Page: FC = () => {
    return (
        <div className="page-container">
            <div className="overlay" />
            <div className="content">
                <div className="logo-container">
                    <img src={Logo} alt="Serious Broker logo" className="logo-dark title-serious-broker" loading="lazy" />
                </div>
                <p className="title-save-crypto-safely">Save Crypto Safely</p>
            </div>
        </div>
    );
};
