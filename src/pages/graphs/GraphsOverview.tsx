import { FC } from "react";
import { routes } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../../utils/providers/providerUser.tsx";
import { TitleHeader } from "../../components/modules/about/TitleHeader.tsx";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const GraphsOverview: FC = () => {
    const { t } = useTranslation();
    const { user } = useUserContext();

    return (
        <>
            <TitleHeader title="Graphs" />
            <Nav variant="pills" defaultActiveKey={routes.recommendation} className="container flex-column">
                <Nav.Item className="padding-top">
                    <Link to={routes.recommendation} className="text-decoration-none">
                        {t("Recommendation")}
                    </Link>
                </Nav.Item>
                {user && (
                    <>
                        <Nav.Item className="padding-top">
                            <Link to={routes.mostProfitableAssets} className="text-decoration-none">
                                {t("Most profitable assets")}
                            </Link>
                        </Nav.Item>
                        <Nav.Item className="padding-top padding-bottom">
                            <Link to={routes.assets} className="text-decoration-none">
                                {t("Assets")}
                            </Link>
                        </Nav.Item>
                    </>
                )}
            </Nav>
        </>
    );
};
