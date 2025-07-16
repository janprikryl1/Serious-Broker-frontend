import {FC} from "react";
import ImageCreateAccount from "../../utils/icons/index/1_create_account.svg";
import ImageSelectPlan from "../../utils/icons/index/2_select_plan.svg";
import ImageCreateBinanceAccount from "../../utils/icons/index/3_create_binance_account.svg";
import ImageStartInvesting from "../../utils/icons/index/4_start_investing.svg";
import {useTranslation} from "react-i18next";

export const StartInvestingWithSeriousBroker: FC = () => {
    const { t } = useTranslation();
    
    return (
        <div style={{ backgroundColor: "#ae9749", minHeight: 600 }}>
            <div className="container pt-5 pb-5">
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
                            <img src={ImageStartInvesting} alt="Start investing" className="img-start-investing-with-serious-broker img-fluid" />
                            <div className="step-content">
                                <div className="index-step-number"><p style={{marginTop:10}}>4</p></div>
                                <p className="text-dark step-description">{t("Start investing")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
