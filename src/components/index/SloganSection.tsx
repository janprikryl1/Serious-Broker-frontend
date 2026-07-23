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
        <div className="tw-bg-quinary tw-h-[12vh] tw-flex tw-items-center">
            <div className="container tw-pt-10 tw-pb-10" data-aos="fade-up" data-aos-duration="1000">
                <h4 className="tw-text-primary tw-text-center tw-pb-2 tw-m-0">{t("Seriousness • Safety • Trust")}</h4>
                <h6 className="tw-text-secondary tw-font-normal tw-tracking-normal tw-text-center tw-p-0 tw-m-0">SERIOUS.BROKER</h6>
            </div>
        </div>
    );
};