import { FC } from "react";
import { Button } from "../../components/reusable/Button.tsx";
import { Link } from "react-router-dom";
import { routes } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";
import { useUserContext } from "../../utils/providers/providerUser.tsx";
import {GuideInvestControlWhyToJoin} from "../../components/guide/GuideInvestControlWhyToJoin.tsx";
import guidedInvestControlPhoneIcon from "../../utils/icons/index/guidedInvestControllPhoneIcon.png";

export const GuidedInvestControlGuide: FC = () => {
    const { t } = useTranslation();
    const { user } = useUserContext();
    const isMobile = useMediaQuery('(max-width:900px)');

    return (
        <>
            <div className="py-2 position-relative" style={{ backgroundColor: "#3c3936" }}>
                <div className="container pt-5 pb-5">
                    <div className="row align-items-center">
                    <div className="col-12 col-sm-8 col-md-6 col-lg-4 text-center text-sm-start ms-sm-4 ms-lg-5">
                        <h1 className="index-title index-section-title">
                            {t("Guided Invest Control")}
                        </h1>
                        <h3 className="index-section-for">
                            {t("For the Cautious")}
                        </h3>
                        <p className="index-section-content">
                            {t("Professional investment management, investing on behalf of clients using their financial resources")}.
                        </p>
                        <div className="text-center text-sm-start mt-3">
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
                        {!isMobile && (
                            <div className="col-12 col-md-6 text-center text-md-end mt-4 mt-md-0">
                                <div className="position-relative d-inline-block" style={{ overflow: 'hidden' }}>
                                    <img
                                        src={guidedInvestControlPhoneIcon}
                                        alt="Graph no bg"
                                        className="img-fluid index-section-image"
                                    />
                                    <div
                                        className="index-section-image-blurred-color-graphh"
                                        style={{
                                            background: "radial-gradient(ellipse at center, white 0%, transparent 30%)"
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                </div>
            </div>
            </div>
            <GuideInvestControlWhyToJoin />
        </>
    );
};