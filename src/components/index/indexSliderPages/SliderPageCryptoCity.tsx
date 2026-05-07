import {FC} from "react";
import {SharedSlideLayout} from "./SharedSlideLayout.tsx";
import CryptoCity from "../../../utils/icons/index/crypto_city.png"
import {useTranslation} from "react-i18next";

export const SliderPageCryptoCity: FC = () => {
  const { t } = useTranslation();

  return (
    <SharedSlideLayout
      imageUrl={CryptoCity}
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
      className="shared-slide-layout--crypto-street"
    >
      <div className="container-xxl h-100 d-flex flex-column justify-content-center">
        <h1 className="slide-title-your-money-your-rules ms-0 mb-4">{`${t("Your Money,")}`}</h1>
        <h1 className="slide-title-your-money-your-rules ms-0">{`${t("Your Rules")}...`}</h1>
        <p className="slide-description-your-money-your-rules ms-0">{t("Savings in crypto.")}</p>
      </div>
    </SharedSlideLayout>
  );
}