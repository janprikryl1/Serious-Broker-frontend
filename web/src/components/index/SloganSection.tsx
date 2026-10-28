import {FC} from "react";
import {useTranslation} from "react-i18next";
import Form from 'react-bootstrap/Form';
import { useUserContext } from "../../utils/providers/providerUser";
import {useNavigate} from "react-router-dom";
import {routes} from "../../utils/constants";
import {Button} from "../reusable/Button.tsx";

export const SloganSection:FC = () => {
    const {t} = useTranslation();

    return (
        <div className="tw-bg-quinary tw-flex tw-items-center tw-py-6 sm:tw-py-8 lg:tw-h-[12vh]">
            <div className="container tw-px-4 sm:tw-px-6"
                 data-aos="fade-up"
                 data-aos-duration="1200"
                 data-aos-offset="0"
                 data-aos-easing="ease-out-cubic"
            >
                <p className="tw-m-0 tw-pb-2 tw-text-center tw-text-sm tw-font-semibold tw-text-primary tw-font-['Sora'] sm:tw-text-base md:tw-text-xl lg:tw-text-3xl">{t("Seriousness • Safety • Trust")}</p>
                <p className="tw-m-0 tw-p-0 tw-text-center tw-text-[10px] tw-font-normal tw-tracking-normal tw-text-secondary-on-light tw-font-['Sora'] sm:tw-text-xs md:tw-text-base lg:tw-text-lg">SERIOUS.BROKER</p>
            </div>
        </div>
    );
};