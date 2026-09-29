import { FC } from "react";
import { Button } from "../../reusable/Button.tsx";
import { Link } from "react-router-dom";
import { routes } from "../../../utils/constants";
import { useTranslation } from "react-i18next";
import BitcoinBg from "../../../utils/icons/index/bitcoin_close_up3_enhanced_no_bg_darker.webp";
import {SharedSlideLayout} from "../indexSliderPages/SharedSlideLayout.tsx";
import CryptoStreet from "../../../utils/icons/index/crypto_street.png";
import CryptoCity from "../../../utils/icons/index/crypto_city.png";

export const MobileSliderPageCryptoCity: FC = () => {
    const { t } = useTranslation();

    return (
/*      <SharedSlideLayout
        imageUrl={CryptoCity}
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
        className="shared-slide-layout--crypto-street"
      >*/
        <div
          className="container d-flex flex-column align-items-start text-start"
          style={{
            paddingTop: "30vh"
          }}
        >
          <h1 className="slide-title-your-money-your-rules--mobile ms-0">{`${t("Your Money,")}`}</h1>
          <h1 className="slide-title-your-money-your-rules--mobile ms-0">{`${t("Your Rules")}...`}</h1>
          <p className="slide-description-your-money-your-rules--mobile ms-0">{t("Savings in crypto.")}</p>
        </div>
      // </SharedSlideLayout>
    );
};
