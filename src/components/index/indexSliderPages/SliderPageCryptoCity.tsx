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
      <div
        className="container-xxl h-100 d-flex flex-column justify-content-center"
        style={{
          minHeight: "80vh",
        }}
      >
        <h1 className="slide-title-your-money-your-rules ms-0 mb-4">{`${t("Your Money,")}`}</h1>
        <h1 className="slide-title-your-money-your-rules ms-0">{`${t("Your Rules")}...`}</h1>
        <p className="slide-description-your-money-your-rules ms-0">{t("Savings in crypto.")}</p>
        {/*<p className="slide-description-your-money-your-rules">*/}
        {/*  <Button className="mb-5 mt-4" type="link" to={routes.about}>{t("Why to save crypto with Serious.Broker")}</Button>*/}
        {/*</p>*/}
      </div>
    </SharedSlideLayout>
  );
}