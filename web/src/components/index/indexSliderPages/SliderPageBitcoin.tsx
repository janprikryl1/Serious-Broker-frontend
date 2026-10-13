import {FC} from "react";
import {SharedSlideLayout} from "./SharedSlideLayout.tsx";
import BitcoinBg from "../../../utils/icons/index/btc_inverted.svg"
import {useTranslation} from "react-i18next";

export const SliderPageBitcoin:FC = () => {
    const { t } = useTranslation();

    return (
        <SharedSlideLayout
            imageUrl={BitcoinBg}
            backgroundSize={"35%"}
            backgroundPosition={"90% 0%"}
        >
            <div className="container mb-10">
                <h1 className="slide-title-automatization">{t("We have automation in our pocket")}</h1>
                <p className="slide-tagline-automatization">
                    {t("Set up an investment plan that suits you and get buy and sell recommendations for carefree investing.")}
                </p>
            </div>
        </SharedSlideLayout>
    );
}