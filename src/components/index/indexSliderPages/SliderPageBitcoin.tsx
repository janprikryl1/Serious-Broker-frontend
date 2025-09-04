import {FC} from "react";
import {SharedSlideLayout} from "./SharedSlideLayout.tsx";
import BitcoinBg from "../../../utils/icons/index/bitcoin_close_up3_enhanced_no_bg_darker.webp"
import {Button} from "../../reusable/Button.tsx";
import {Link} from "react-router-dom";
import {routes} from "../../../utils/constants";
import {useTranslation} from "react-i18next";

export const SliderPageBitcoin:FC = () => {
    const { t } = useTranslation();

    return (
        <SharedSlideLayout
            imageUrl={BitcoinBg}
            backgroundSize={"40%"}
            backgroundPosition={"100% 10%"}
        >
            <div className="container">
                <h1 className="slide-title-automatization">{t("We have automation in our pocket")}</h1>
                <p className="slide-tagline-automatization">
                    {t("Set up an investment plan that suits you and get buy and sell recommendations for carefree investing.")}
                </p>
                <p className="slide-tagline-automatization">
                    <Link to={routes.cryptocurrencyDetailURL + 1}>
                        <Button style={{fontWeight:700}}>{t("Learn Now")}</Button>
                    </Link>
                </p>
            </div>
        </SharedSlideLayout>
    );
}