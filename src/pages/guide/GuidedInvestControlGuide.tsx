import {FC} from "react";
import {Button} from "../../components/reusable/Button.tsx";
import {Link} from "react-router-dom";
import {routes} from "../../utils/constants";
import {useTranslation} from "react-i18next";
import {useMediaQuery} from "@mui/material";
import {GuidedInvestControlBgImage} from "../../components/index/GuidedInvestControl.tsx";
import {useUserContext} from "../../utils/providers/providerUser.tsx";

export const GuidedInvestControlGuide:FC = () => {
    const {t} = useTranslation();
    const {user} = useUserContext();
    const isMobile = useMediaQuery('(max-width:900px)');
    return (
        <>
            <div className="py-5 position-relative" style={{backgroundColor: "#3c3936"}}>
                {!isMobile && (
                    <div className="index-guided-dotted-image">
                        <GuidedInvestControlBgImage/>
                        <div className="index-guided-dotted-square" style={{marginLeft: "3vw"}}/>
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
                                {user ? (
                                    <Button className="index-section-button">
                                        <Link to={routes.profile.profileURL}>{t("Go to profile")}</Link>
                                    </Button>
                                ) : (
                                    <Button className="index-section-button"><Link
                                        to={routes.signIn}>{t("Login")}</Link></Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-4 text-center text-sm-start ms-sm-4 ms-lg-5 pt-5">
                <h2>Nabízíme...</h2>
            </div>
        </>
    )
}