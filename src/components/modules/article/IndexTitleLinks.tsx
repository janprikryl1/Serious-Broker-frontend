import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";
import {indexLinks} from "../../../utils/constants";

export const IndexTitleLinks: FC = () => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width:768px)');
    const [currentImage, setCurrentImage] = useState(indexLinks.howToAvoidBigLosses.image);

    const handleMouseEnter = (image: string) => {
        setCurrentImage(image);
    };

    return (
        <div
            className="blur-background"
            style={{
                margin: "5%",
                display: "flex",
                alignItems: "center",
                gap: "90px",
            }}
        >
            {!isMobile && (
                <img
                    src={currentImage}
                    alt="Popis obrázku"
                    style={{ width: "400px", borderRadius: "10px" }}
                />
            )}

            <div>
                {Object.keys(indexLinks).map((key: string) => {
                    const item = indexLinks[key as keyof typeof indexLinks];
                    return (
                        <Link
                            to={item.link}
                            key={key}
                            className="link-underline-none mb-10"
                            style={{
                                color: "#fac900",
                                display: "block",
                            }}
                            onMouseEnter={() => handleMouseEnter(item.image || "")}
                        >
                            <h3>{t(item.title)}</h3>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};