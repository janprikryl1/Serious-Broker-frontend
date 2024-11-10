import { FC } from "react";
import { Link } from "react-router-dom";
import { indexLinks } from "../../../utils/constants";
import { useTranslation } from "react-i18next";

export const TitleLinks: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="container" style={{ marginTop: "3%" }}>
            <div style={{ textAlign: "center" }}>
                <h1 className="blur-background" style={{ color: "#fac900" }}>
                    <strong>{t("Welcome to Serious Broker")}</strong>
                </h1>
            </div>

            <div className="blur-background" style={{ marginTop: "5%", marginBottom: "5%" }}>
                {Object.keys(indexLinks).map((key) => {
                    const item = indexLinks[key];
                    return (
                        <Link
                            to={item.link}
                            key={key}
                            className="link-underline-none"
                            style={{ marginBottom: "10px", color: "#fac900" }}
                        >
                            <h2 style={{ textTransform: "none" }}>{t(item.title)}</h2>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
