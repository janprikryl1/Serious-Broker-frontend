import { FC } from "react";
import Logo from "../../../utils/icons/logo/SB-handwritten-white.svg";
import { useTranslation } from "react-i18next";
import CryptoStreet from "../../../utils/icons/index/crypto_street.png";
import {SharedSlideLayout} from "../indexSliderPages/SharedSlideLayout.tsx";
import {useMediaQuery} from "@mui/material";

export const MobileSliderPageCryptoStreet: FC = () => {
    const { t } = useTranslation();

    return (
      <SharedSlideLayout
        imageUrl={CryptoStreet}
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
        className="shared-slide-layout--crypto-street"
      >
        <div
          className="container d-flex flex-column align-items-start text-start"
          style={{
            paddingTop: "30vh"

          }}
        >
          <h1 className="slide-title-automatization--mobile mb-4">
            {t("Seriousness • Safety • Trust")}
          </h1>
          <p className="slide-tagline-automatization--mobile" style={{ maxWidth: "90%" }}>
            {t("Set up an investment plan that suits you and get buy and sell recommendations for carefree investing.")}
          </p>
        </div>
      </SharedSlideLayout>
    );
};
