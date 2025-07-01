import { FC } from "react";
import { Button } from "../reusable/Button.tsx";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { guideURLS } from "../../utils/constants";
import guidedInvestControlPhoneIcon from "../../utils/icons/index/two hands with bitcoin gradient.png";

export const GuidedInvestControl: FC = () => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width:900px)');

    return (
        <div style={{ backgroundColor: "#3c3936" }}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6 text-center text-md-start">
                        <h1 className="index-title index-section-title">
                            {t("Guided Invest Control")}
                        </h1>
                        <h3 className="index-section-for">
                            {t("For the Cautious")}
                        </h3>
                        <p className="index-section-content">
                            {t("Professional investment management, investing on behalf of clients using their financial resources")}.
                        </p>
                        <div className="text-center text-md-start mt-3">
                            <Button className="index-section-button">
                                <Link to={guideURLS.guidedInvestControl}>
                                    {t("Learn More")}
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {!isMobile && (
                        <div className="col-12 col-md-6 text-center text-md-end mt-md-0">
                            <div className="position-relative d-inline-block">
                                <img
                                    src={guidedInvestControlPhoneIcon}
                                    alt="Graph no bg"
                                    className="img-fluid index-section-image"
                                    style={{ scale: '1.2' }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
