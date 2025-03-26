import { FC } from "react";
import { routes } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import {TitleHeader} from "../../components/about/TitleHeader.tsx";

export const GraphsOverview: FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <TitleHeader title="Graphs" />
            <Nav variant="pills" defaultActiveKey={routes.recommendation} className="container flex-column overview-graphs-container">
                <div className="content">
                    <Nav.Item className="padding-top">
                        <Link to={routes.recommendation} className="text-decoration-none">
                            {t("Recommendation")}
                        </Link>
                    </Nav.Item>
                </div>
            </Nav>
        </>
    );
};
