import {FC} from "react";
import ImageCreateAccount from "../../utils/icons/index/1_create_account.svg";
import ImageSelectPlan from "../../utils/icons/index/2_select_plan.svg";
import ImageCreateBinanceAccount from "../../utils/icons/index/3_create_binance_account.svg";
import ImageStartInvesting from "../../utils/icons/index/4_start_investing.svg";

export const StartInvestingWithSeriousBroker: FC = () => {
    return (
        <div style={{ backgroundColor: "#ae9749" }}>
            <div className="container pt-5 pb-5">
                <h2 className="mb-5 text-black">Start Investing with Serious Broker</h2>
                <div className="row text-center">
                    <div className="col-sm">
                        <div className="step-wrapper">
                            <img src={ImageCreateAccount} alt="Create account" className="img-start-investing-with-serious-broker" />
                            <div className="step-content">
                                <p className="index-step-number">1</p>
                                <p className="text-black step-description">Create a Serious Broker account</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="step-wrapper">
                            <img src={ImageSelectPlan} alt="Select plan" className="img-start-investing-with-serious-broker" />
                            <div className="step-content">
                                <p className="index-step-number">2</p>
                                <p className="text-black step-description">Choose your investment plan</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="step-wrapper">
                            <img src={ImageCreateBinanceAccount} alt="Create Binance account" className="img-start-investing-with-serious-broker" />
                            <div className="step-content">
                                <p className="index-step-number">3</p>
                                <p className="text-black step-description">Create a Binance account</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="step-wrapper">
                            <img src={ImageStartInvesting} alt="Start investing" className="img-start-investing-with-serious-broker" />
                            <div className="step-content">
                                <p className="index-step-number">4</p>
                                <p className="text-black step-description">Start investing</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
