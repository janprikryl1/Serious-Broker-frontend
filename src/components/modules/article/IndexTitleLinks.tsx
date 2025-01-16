import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";
import { indexLinks } from "../../../utils/constants";

export const IndexTitleLinks: FC = () => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery("(max-width:768px)");
    const [currentIndex, setCurrentIndex] = useState(0);

    const linkKeys = Object.keys(indexLinks) as (keyof typeof indexLinks)[];
    const currentLink = indexLinks[linkKeys[currentIndex]];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % linkKeys.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [linkKeys.length]);

    return (
        <div className="blur-background index-links-container">
            {!isMobile && (
                <img
                    src={currentLink.image}
                    alt="Preview"
                    style={{ width: 300, borderRadius: 10 }}
                />
            )}
            <div style={{ flex: 1 }}>
                {linkKeys.map((key, index) => {
                    const { link, title } = indexLinks[key];
                    const isActive = index === currentIndex;

                    return (
                        <div
                            key={key}
                            style={{
                                position: "relative",
                                margin: "5px",
                                alignItems: "center",
                            }}
                        >
                            {isActive && !isMobile && <div className="highlight-bar" />}
                            <Link
                                to={link}
                                className="link-underline-none"
                                onMouseEnter={() => setCurrentIndex(index)}
                            >
                                <h3
                                    style={{
                                        color: isActive ? "#ffa602" : "#fac900",
                                        fontSize: "25px",
                                        marginLeft: !isMobile ? 20 : 0,
                                    }}
                                >
                                    {t(title)}
                                </h3>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
