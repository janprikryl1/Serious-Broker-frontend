import {FC} from "react";
import DotMeshImage from "../../utils/icons/index/dot_mesh_lighter.svg";
import {Button} from "../reusable/Button.tsx";
import {useTranslation} from "react-i18next";
import {useMediaQuery} from "@mui/material";
import {Link} from "react-router-dom";
import {guideURLS} from "../../utils/constants";

export const GuidedInvestControlBgImage: FC = () => (
    <img
        src={DotMeshImage}
        alt="Graph no bg"
        className="index-guided-dotted-bg-image"
    />
);

export const GuidedInvestControl: FC = () => {
    const {t} = useTranslation();
    const isMobile = useMediaQuery('(max-width:900px)');

    return (
        <div className="py-5 position-relative" style={{backgroundColor: "#3c3936"}}>
            {!isMobile && (
                <div className="index-guided-dotted-image">
                    <GuidedInvestControlBgImage/>
                    <div className="index-guided-dotted-square"/>
                </div>
            )}

            <div className="container pt-5 pb-5">
                <div className="col-sm-4 text-center text-sm-start ms-sm-4 ms-lg-5">
                    <div className="col-sm text-center text-sm-start">
                        <h1 className="index-title index-section-title">
                            {t("Guided Invest Control")}
                        </h1>
                        <h3 className="index-section-for">
                            {t("For the Cautious")}
                        </h3>
                        <p className="index-section-content">
                            {t("Professional investment management, investing on behalf of clients using their financial resources")}.
                        </p>
                        <div className="text-center mt-3">
                            <Button className="index-section-button"><Link
                                to={guideURLS.guidedInvestControl}>{t("Learn More")}</Link></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};