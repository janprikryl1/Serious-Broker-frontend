import { FC } from "react";
import Logo from "../../../utils/icons/logo/SB-handwritten-white.svg";
import { useTranslation } from "react-i18next";

export const IndexMobileSliderPage: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: '100vh' }}>
            <div className="w-100 d-flex justify-content-center mb-4">
                <img
                    src={Logo}
                    alt="Serious Broker logo"
                    loading="lazy"
                    style={{ width: "90%" }}
                />
            </div>
            <p>{t("Together We Help Your Investments Grow")}</p>
        </div>
    );
};
