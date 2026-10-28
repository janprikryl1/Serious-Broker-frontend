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

const STEPS = [
    {
        image: ImageCreateAccount,
        alt: 'Create account',
        titleKey: 'Create a Serious.Broker account',
    },
    {
        image: ImageSelectPlan,
        alt: 'Select plan',
        titleKey: 'Choose your investment plan',
    },
    {
        image: ImageCreateBinanceAccount,
        alt: 'Create Binance account',
        titleKey: 'Create a Binance account',
    },
    {
        image: ImageProvideYourAPIKEY,
        alt: 'Send us your API key',
        titleKey: 'Send us your API key',
    },
    {
        image: ImageStartInvesting,
        alt: 'Start investing',
        titleKey: 'Start investing',
    },
];

export const InvestWithUs: FC = () => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
      <div className="tw-bg-quinary">
          <div className="container tw-py-16">
              <p className="tw-text-secondary-on-light tw-font-normal tw-text-base tw-tracking-normal tw-mb-2 tw-pb-0 tw-pt-12 tw-font-['Sora']">
                  {t("ABOUT PRODUCT")}
              </p>
              <h2 className="mb-5 tw-text-black index-section-head-title">
                  {t("Invest With Us")}
              </h2>

              <div className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-flex-wrap tw-justify-center tw-gap-y-14 lg:tw-gap-x-8 xl:tw-gap-x-4 tw-w-full">
                  {STEPS.map((step, index) => (
                    <div
                      key={index}
                      className="tw-flex tw-flex-col tw-items-center tw-w-full lg:tw-w-[30%] xl:tw-w-[18%] lg:tw-mb-0 lg:tw-pb-0"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                      data-aos-delay={(index + 1) * 100}
                      data-aos-offset="150"
                      data-aos-easing="ease-out-cubic"
                    >
                        <div className="tw-flex tw-justify-center tw-items-end tw-h-40 lg:tw-h-48 xl:tw-h-52">
                            <img src={step.image} alt={step.alt} className="tw-w-auto tw-h-full img-fluid" />
                        </div>

                        <div className="step-content tw-flex tw-flex-col tw-items-center tw-mt-6">
                            <div className="tw-flex tw-items-center tw-justify-center tw-rounded-full tw-bg-tertiary tw-text-white tw-mx-auto tw-my-2.5 tw-translate-y-[2px] tw-w-8 tw-h-8 tw-text-lg sm:tw-w-10 sm:tw-h-10 sm:tw-text-[25px] tw-shadow-[0_7px_25px_-3px] tw-shadow-tertiary">
                                <div>{index + 1}</div>
                            </div>
                            <p className="tw-mt-3 tw-text-center tw-text-base lg:tw-text-lg tw-text-stone-800">
                                {t(step.titleKey)}
                            </p>
                        </div>
                    </div>
                  ))}
              </div>
          </div>
      </div>
    );
};
