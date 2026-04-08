import {FC} from "react";
import {SharedSlideLayout} from "./SharedSlideLayout.tsx";
import CryptoStreet from "../../../utils/icons/index/crypto_street.png"
import {useTranslation} from "react-i18next";

export const SliderPageCryptoStreet: FC = () => {
  const { t } = useTranslation();

  return (
    <SharedSlideLayout
      imageUrl={CryptoStreet}
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
        <h1 className="slide-title-automatization mb-4">
          {t("Seriousness • Safety • Trust")}
        </h1>
        <p className="slide-tagline-automatization" style={{ maxWidth: "40%" }}>
          {t("Set up an investment plan that suits you and get buy and sell recommendations for carefree investing.")}
        </p>
      </div>

    </SharedSlideLayout>
  );
}