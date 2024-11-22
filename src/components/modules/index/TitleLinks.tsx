import { FC } from "react";
import { Link } from "react-router-dom";
import { indexLinks } from "../../../utils/constants";
import { useTranslation } from "react-i18next";
import {IndexTitleWrapper} from "./IndexTitleWrapper.tsx";

export const TitleLinks: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="container" style={{ marginTop: "3%" }}>
            <IndexTitleWrapper variant="h1">
                <strong>{t("Welcome to Serious Broker")}</strong>
            </IndexTitleWrapper>
            <IndexTitleWrapper variant="p">{t("Come and save crypto with us")}</IndexTitleWrapper>

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
