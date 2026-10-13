import {FC} from "react";
import CountUp from "react-countup";
import {useTranslation} from "react-i18next";

type Props = {
    imageSrc: string;
    altText: string;
};

export const BlurredImage:FC<Props> = ({ imageSrc, altText }) => {
    const {t} = useTranslation();
    
    return (
      <div className="tw-relative tw-w-full">
        <img
          src={imageSrc}
          alt={altText}
          className="tw-w-full tw-h-auto tw-max-h-[500px] tw-object-contain tw-rounded-md"
        />

        <div className="tw-absolute tw-left-3 tw-top-3 sm:tw-left-5 sm:tw-top-5 md:tw-left-6 md:tw-top-6">
          <div className="tw-bg-stone-950/50 tw-backdrop-blur-sm tw-shadow-lg tw-rounded-md tw-text-center tw-py-2 sm:tw-py-3 tw-px-3 sm:tw-px-5">
            <h4 className="tw-text-secondary tw-font-normal tw-leading-[22px] tw-mb-0 tw-pb-0 tw-mt-1">
              <span className="purecounter">
                <CountUp end={10} duration={10} />
              </span>
              {"+ "}
              {t("Years")}
              <p className="tw-text-white tw-text-sm sm:tw-text-base md:tw-text-lg tw-font-normal tw-mb-0 tw-mt-2 sm:tw-mt-3">
                {t("Experience")}
              </p>
            </h4>
          </div>
        </div>

        <div className="tw-absolute tw-right-3 tw-bottom-3 sm:tw-right-5 sm:tw-bottom-5 md:tw-right-6 md:tw-bottom-6">
          <div className="tw-bg-stone-950/50 tw-backdrop-blur-sm tw-shadow-lg tw-rounded-md tw-text-center tw-py-2 sm:tw-py-3 tw-px-3 sm:tw-px-5">
            <h4 className="tw-text-secondary tw-font-normal tw-leading-[22px] tw-mb-0 tw-pb-0 tw-mt-1">
              <span className="purecounter">
                <CountUp end={30} duration={5} />
              </span>
              {" K+"}
              <p className="tw-text-white tw-text-sm sm:tw-text-base md:tw-text-lg tw-font-normal tw-mb-0 tw-mt-2 sm:tw-mt-3">
                {t("Currencies")}
              </p>
            </h4>
          </div>
        </div>
      </div>
    );
};