import {FC} from "react";
import ImageCreateAccount from "../../utils/icons/index/1_create_account.svg";
import ImageSelectPlan from "../../utils/icons/index/2_select_plan.svg";
import ImageCreateBinanceAccount from "../../utils/icons/index/3_create_binance_account.svg";
import ImageProvideYourAPIKEY from "../../utils/icons/index/4_provide-your-api-key.svg";
import ImageStartInvesting from "../../utils/icons/index/5_start_investing.svg";
import {useTranslation} from "react-i18next";
import {Button, ButtonColor} from "../reusable/Button.tsx";
import {guideURLS} from "../../utils/constants";
import {Link} from "react-router-dom";
import {useMediaQuery} from "@mui/material";

export const StartInvestingWithSeriousBroker: FC = () => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <div style={{ backgroundColor: "#B1974E", minHeight: 700 }}>
            <div className="container-xxl pt-5 pb-5">
                <h2 className="mb-5 text-dark index-section-head-title">{t("Start Investing with Serious Broker")}</h2>
                <div className="row text-center gx-0">
                    <div className="col-sm">
                        <div className="step-wrapper">
                            <img src={ImageCreateAccount} alt="Create account"
                                 className="img-start-investing-with-serious-broker img-fluid"/>
                            <div className="step-content">
                                <div className="index-step-number"><p style={{marginTop:13}}>1</p></div>
                                <p className="text-dark step-description">{t("Create a Serious Broker account")}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="step-wrapper">
                            <img src={ImageSelectPlan} alt="Select plan" className="img-start-investing-with-serious-broker img-fluid" />
                            <div className="step-content">
                                <div className="index-step-number"><p style={{marginTop:13}}>2</p></div>
                                <p className="text-dark step-description">{t("Choose your investment plan")}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="step-wrapper">
                            <img src={ImageCreateBinanceAccount} alt="Create Binance account" className="img-start-investing-with-serious-broker img-fluid" />
                            <div className="step-content">
                                <div className="index-step-number"><p style={{marginTop:10}}>3</p></div>
                                <p className="text-dark step-description">{t("Create a Binance account")}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="step-wrapper">
                            <img src={ImageProvideYourAPIKEY} alt="Start investing" className="img-start-investing-with-serious-broker img-fluid" style={{marginTop:10, width:200}} />
                            <div className="step-content">
                                <div className="index-step-number"><p style={{marginTop:10}}>4</p></div>
                                <p className="text-dark step-description">{t("Send us your API key")}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="step-wrapper">
                            <img src={ImageStartInvesting} alt="Start investing" className="img-start-investing-with-serious-broker img-fluid" />
                            <div className="step-content">
                                <div className="index-step-number"><p style={{marginTop:10}}>5</p></div>
                                <p className="text-dark step-description">{t("Start investing")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", paddingTop: isMobile ? -40 : 40, paddingBottom:40 }}>
                <Link to={guideURLS.index}>
                    <Button color={ButtonColor.lightBrown} style={{color:"white", fontSize:18}}>{t("Learn More")}</Button>
                </Link>
            </div>
        </div>
    );
};
