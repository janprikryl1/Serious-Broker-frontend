import { FC } from "react";
import {useMediaQuery} from "@mui/material";
import Logo from "../utils/icons/logo/SB2.svg";

type Props = {
    image: string;
};

export const Page: FC<Props> = ({ image }) => {
    const isMobile = useMediaQuery('(max-width:768px)');

    return (
        <div
            style={{
                position: "relative",
                height: "55vh",
                width: "100%",
                backgroundColor: "#120c06",
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: isMobile ? "-40vw 20vh" : "-15vw -5vh",
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
                color: "#fff",
                letterSpacing: "10px",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    width: "99.1%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    zIndex: 1,
                }}
            />
            <div style={{position: "relative", zIndex: 2, paddingRight: isMobile ? "5vw" : "5rem"}}>
                <div style={{textAlign: "right", marginBottom: "5vh"}}>
                    <img src={Logo} alt="Serious Broker logo" className="logo-dark title-serious-broker"/>
                </div>
                <p className="title-save-crypto-safely">
                    Save Crypto Safely
                </p>
            </div>
        </div>
    );
};
