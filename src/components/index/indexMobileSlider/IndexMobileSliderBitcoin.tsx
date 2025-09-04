import { FC } from "react";
import { Button } from "../../reusable/Button.tsx";
import { Link } from "react-router-dom";
import { routes } from "../../../utils/constants";
import { useTranslation } from "react-i18next";
import BitcoinBg from "../../../utils/icons/index/bitcoin_close_up3_enhanced_no_bg_darker.webp";

export const IndexMobileSliderBitcoin: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: '100vh' }}>
            <img src={BitcoinBg} alt="Bitcoin" loading="lazy" style={{ width: "200px" }} />
            <h1 className="mt-4">{t("We have automation in our pocket")}</h1>
            <p>{t("Set up an investment plan that suits you and get buy and sell recommendations for carefree investing.")}</p>
            <div className="mt-5">
                <Button>
                    <Link to={routes.cryptocurrencyDetailURL + 1} className="text-decoration-none text-dark">
                        {t("Learn Now")}
                    </Link>
                </Button>
            </div>
        </div>
    );
};
