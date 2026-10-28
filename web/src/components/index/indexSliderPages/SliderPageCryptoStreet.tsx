import {FC} from "react";
import {SharedSlideLayout} from "./SharedSlideLayout.tsx";
import CryptoStreet from "../../../utils/icons/index/crypto_street.webp"
import {useTranslation} from "react-i18next";
import {useMediaQuery} from "@mui/material";

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
        className="container h-100 d-flex flex-column"
        style={{
          paddingTop: "30vh"
        }}
      >
        <h1 className="slide-title-automatization mb-4">
          {t("Seriousness • Safety • Trust")}
        </h1>
        <p className="slide-tagline-automatization">
          {t("Set up an investment plan that suits you and get buy and sell recommendations for carefree investing.")}
        </p>
      </div>

    </SharedSlideLayout>
  );
}