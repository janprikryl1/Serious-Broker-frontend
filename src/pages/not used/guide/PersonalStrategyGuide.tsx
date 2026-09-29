import { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GraphNoBg from "../../../utils/icons/index/graph_no_bg2.webp";
import { Button } from "../../../components/reusable/Button.tsx";
import { routes } from "../../../utils/constants";
import { useUserContext } from "../../../utils/providers/providerUser.tsx";
import {PersonalStrategyWhyToJoin} from "../../../components/guide/PersonalStrategyWhyToJoin.tsx";

export const PersonalStrategyGuide: FC = () => {
    const { t } = useTranslation();
    const { user } = useUserContext();

    return (
        <>
            <div className="row justify-content-center align-items-center gx-0 mb-5">
                <div className="col-sm-5 text-center text-sm-end mb-4 mb-sm-0">
                    <div className="position-relative d-inline-block" style={{ overflow: 'hidden', maxWidth: '100%' }}>
                        <img src={GraphNoBg} alt="Graph" className="img-fluid index-section-image" />
                        <div
                            className="index-section-image-blurred-color-graphh"
                            style={{ background: "radial-gradient(ellipse at center, white 0%, transparent 50%)" }}
                        />
                    </div>
                </div>
                <div className="col-sm-4 text-center text-sm-start">
                    <h1 className="index-title index-section-title">{t("Personal Strategy")}</h1>
                    <h3 className="index-section-for">{t("For Individuals")}</h3>
                    <p className="index-section-content">
                        {t("Personalized investment recommendations tailored to individual needs and market trends")}.
                    </p>
                    <div className="text-center mt-3">
                        {user ? (
                            <Button className="index-section-button">
                                <Link to={routes.profile.profileURL}>{t("Go to profile")}</Link>
                            </Button>
                        ) : (
                            <Button className="index-section-button">
                                <Link to={routes.signIn}>{t("Login")}</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <PersonalStrategyWhyToJoin />
        </>
    );
};