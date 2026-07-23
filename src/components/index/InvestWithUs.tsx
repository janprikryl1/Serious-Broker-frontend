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

export const InvestWithUs: FC = () => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <div className="tw-bg-quinary">
            <div className="container-xxl tw-py-16">
                <h6 className="tw-text-secondary tw-font-normal tw-text-base tw-tracking-normal tw-pb-0 tw-pt-12">{t("ABOUT PRODUCT")}</h6>
                <h2 className="mb-5 tw-text-black index-section-head-title">{t("Invest With Us")}</h2>

                <div className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-flex-wrap tw-justify-center tw-gap-y-14 lg:tw-gap-x-8 xl:tw-gap-x-4 tw-mt-14 tw-pt-14 tw-w-full">
                    {/* Step 1 */}
                    <div className="tw-flex tw-flex-col tw-items-center tw-w-full lg:tw-w-[30%] xl:tw-w-[18%] tw-mb-14 tw-pb-2 lg:tw-mb-0 lg:tw-pb-0">
                        <div className="tw-flex tw-justify-center tw-items-end tw-h-40">
                            <img src={ImageCreateAccount} alt="Create account" className="img-start-investing-with-serious-broker img-fluid"/>
                        </div>
                        <div className="step-content tw-flex tw-flex-col tw-items-center tw-mt-6">
                            <div className="index-step-number tw-shadow-[0_7px_25px_-3px] tw-shadow-tertiary">
                                <div>1</div>
                            </div>
                            <p className="step-description tw-text-center tw-mt-3">{t("Create a Serious.Broker account")}</p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="tw-flex tw-flex-col tw-items-center tw-w-full lg:tw-w-[30%] xl:tw-w-[18%] tw-mb-14 tw-pb-2 lg:tw-mb-0 lg:tw-pb-0">
                        <div className="tw-flex tw-justify-center tw-items-end tw-h-40">
                            <img src={ImageSelectPlan} alt="Select plan" className="img-start-investing-with-serious-broker img-fluid" />
                        </div>
                        <div className="step-content tw-flex tw-flex-col tw-items-center tw-mt-6">
                            <div className="index-step-number tw-shadow-[0_7px_25px_-3px] tw-shadow-tertiary">
                                <div>2</div>
                            </div>
                            <p className="step-description tw-text-center tw-mt-3">{t("Choose your investment plan")}</p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="tw-flex tw-flex-col tw-items-center tw-w-full lg:tw-w-[30%] xl:tw-w-[18%] tw-mb-14 tw-pb-2 lg:tw-mb-0 lg:tw-pb-0">
                        <div className="tw-flex tw-justify-center tw-items-end tw-h-40">
                            <img src={ImageCreateBinanceAccount} alt="Create Binance account" className="img-start-investing-with-serious-broker img-fluid" />
                        </div>
                        <div className="step-content tw-flex tw-flex-col tw-items-center tw-mt-6">
                            <div className="index-step-number tw-shadow-[0_7px_25px_-3px] tw-shadow-tertiary">
                                <div>3</div>
                            </div>
                            <p className="step-description tw-text-center tw-mt-3">{t("Create a Binance account")}</p>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="tw-flex tw-flex-col tw-items-center tw-w-full lg:tw-w-[30%] xl:tw-w-[18%] tw-mb-14 tw-pb-2 lg:tw-mb-0 lg:tw-pb-0">
                        <div className="tw-flex tw-justify-center tw-items-end tw-h-40">
                            <img src={ImageProvideYourAPIKEY} alt="Start investing" className="img-start-investing-with-serious-broker img-fluid" style={{ width: 200 }} />
                        </div>
                        <div className="step-content tw-flex tw-flex-col tw-items-center tw-mt-6">
                            <div className="index-step-number tw-shadow-[0_7px_25px_-3px] tw-shadow-tertiary">
                                <div>4</div>
                            </div>
                            <p className="step-description tw-text-center tw-mt-3">{t("Send us your API key")}</p>
                        </div>
                    </div>

                    {/* Step 5 */}
                    <div className="tw-flex tw-flex-col tw-items-center tw-w-full lg:tw-w-[30%] xl:tw-w-[18%] tw-pb-14 tw-mb-">
                        <div className="tw-flex tw-justify-center tw-items-end tw-h-40">
                            <img src={ImageStartInvesting} alt="Start investing" className="img-start-investing-with-serious-broker img-fluid" />
                        </div>
                        <div className="step-content tw-flex tw-flex-col tw-items-center tw-mt-6">
                            <div className="index-step-number tw-shadow-[0_7px_25px_-3px] tw-shadow-tertiary">
                                <div>5</div>
                            </div>
                            <p className="step-description tw-text-center tw-mt-3">{t("Start investing")}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/*<div style={{ display: "flex", justifyContent: "center", paddingTop: isMobile ? -40 : 40, paddingBottom:40 }}>
                <Link to={guideURLS.index}>
                    <Button color={ButtonColor.lightBrown} style={{color:"white", fontSize:18}}>{t("Learn More")}</Button>
                </Link>
            </div>*/}
        </div>
    );
};
