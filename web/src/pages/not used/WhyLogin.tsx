import {FC} from "react";
import {TitleHeader} from "../../components/about/TitleHeader.tsx";
import {useTranslation} from "react-i18next";
import portfolioExample from "../../utils/icons/guides/portfolio_example.svg";
import pairsExample from "../../utils/icons/guides/pairsExample.svg";
import myWatchlistExample from "../../utils/icons/guides/myWatchlistExample.svg";
import commentsExample from "../../utils/icons/guides/commentsExample.svg";
import {Button} from "../../components/reusable/Button.tsx";
import {Link} from "react-router-dom";
import {routes} from "../../utils/constants";

export const WhyLogin:FC = () => {
    const { t } = useTranslation();

    return (
    <>
        <TitleHeader title={"Why to login?"} />
        <div className="container">
            <div className="row justify-content-center align-items-center gx-0 mb-5 mt-5">
                <div className="col-sm-5 text-center text-sm-end mb-4 mb-sm-0 me-5">
                    <div className="position-relative d-inline-block" style={{ overflow: 'hidden', maxWidth: '100%' }}>
                        <img src={portfolioExample} alt="portfolio example" className="img-fluid index-section-image" />
                        <div
                            className="index-section-image-blurred-color-graphh"
                            style={{ background: "radial-gradient(ellipse at center, white 0%, transparent 50%)" }}
                        />
                    </div>
                </div>
                <div className="col-sm-4 text-center text-sm-start">
                    <h1 className="index-title index-section-title">{t("Custom portfolios")}</h1>
                    <h3 className="index-section-for">{t("For Registered")}</h3>
                    <p className="index-section-content">
                        {t("Build your own portfolio with a given representation of coins in any ratio and monitor its development.")}.
                    </p>
                    <div className="text-center mt-3">
                        <Button className="index-section-button">
                            <Link to={routes.signIn}>{t("Login")}</Link>
                        </Button>
                    </div>
                </div>
            </div>


            <div className="row justify-content-center align-items-center gx-0" style={{marginTop:100}}>
                <div className="col-sm-4 text-center text-sm-start me-5">
                    <h1 className="index-title index-section-title">{t("Detail of pairs")}</h1>
                    <h3 className="index-section-for">{t("For Registered")}</h3>
                    <p className="index-section-content">
                        {t("Track when it was most profitable to sell or buy based on historical data.")}.
                    </p>
                    <div className="text-center mt-3">
                        <Button className="index-section-button">
                            <Link to={routes.register}>{t("Register")}</Link>
                        </Button>
                    </div>
                </div>
                <div className="col-sm-5 text-center text-sm-end mb-sm-0">
                    <div className="position-relative d-inline-block" style={{ overflow: 'hidden', maxWidth: '100%' }}>
                        <img src={pairsExample} alt="pairs example" className="img-fluid index-section-image" />
                        <div
                            className="index-section-image-blurred-color-graphh"
                            style={{ background: "radial-gradient(ellipse at center, white 0%, transparent 50%)" }}
                        />
                    </div>
                </div>
            </div>

            <div className="row justify-content-center align-items-center gx-0 mb-5">
                <div className="col-sm-5 text-center text-sm-end mb-4 mb-sm-0 me-5">
                    <div className="position-relative d-inline-block" style={{ overflow: 'hidden', maxWidth: '100%' }}>
                        <img src={myWatchlistExample} alt="my watchlist icons" className="img-fluid index-section-image" />
                    </div>
                </div>
                <div className="col-sm-4 text-center text-sm-start">
                    <h1 className="index-title index-section-title">{t("My watch list")}</h1>
                    <h3 className="index-section-for">{t("For Registered")}</h3>
                    <p className="index-section-content">
                        {t("Save assets, coins or articles for later.")}.
                    </p>
                    <div className="text-center mt-3">
                        <Button className="index-section-button">
                            <Link to={routes.signIn}>{t("Login")}</Link>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center align-items-center gx-0 mt-5">
                <div className="col-sm-3 text-center text-sm-start me-5">
                    <h1 className="index-title index-section-title">{t("Comments")}</h1>
                    <h3 className="index-section-for">{t("For Registered")}</h3>
                    <p className="index-section-content">
                        {t("Comment articles.")}.
                    </p>
                </div>
                <div className="col-sm-5 text-center text-sm-end mb-sm-0">
                    <div className="position-relative d-inline-block" style={{ overflow: 'hidden', maxWidth: '100%' }}>
                        <img src={commentsExample} alt="pairs example" className="img-fluid index-section-image" />
                    </div>
                </div>
            </div>
        </div>
      </>
  );
};