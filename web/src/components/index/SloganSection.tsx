import {FC} from "react";
import {useTranslation} from "react-i18next";

export const SloganSection:FC = () => {
    const {t} = useTranslation();

    return (
        <div className="tw-bg-quinary tw-flex tw-items-center tw-py-6 sm:tw-py-8 lg:tw-h-[12vh]">
            <div className="container tw-px-4 sm:tw-px-6"
                 data-aos="fade-up"
                 data-aos-duration="800"
                 data-aos-offset="0"
                 data-aos-easing="ease-out-cubic"
            >
                <p className="tw-m-0 tw-pb-2 tw-text-center tw-text-sm tw-font-semibold tw-text-primary tw-font-['Sora'] sm:tw-text-base md:tw-text-lg lg:tw-text-2xl">{t("Seriousness • Safety • Trust")}</p>
                <p className="tw-m-0 tw-p-0 tw-text-center tw-text-[10px] tw-font-normal tw-tracking-normal tw-text-secondary-on-light tw-font-['Sora'] sm:tw-text-xs md:tw-text-sm lg:tw-text-base">SERIOUS.BROKER</p>
            </div>
        </div>
    );
};